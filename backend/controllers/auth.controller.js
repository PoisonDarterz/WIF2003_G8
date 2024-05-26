const express = require("express");
const router = express.Router();
const mongoose = require('mongoose');
const User = require('../models/user.model');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');

// Load environment variables from a .env file if present
require('dotenv').config();

// SignUp
router.get('/register', (req, res) => {
    res.render('register');
});

router.post('/register', async (req, res) => {
    try {
        const { employeeID, email, password, role } = req.body;

        const existingUserByEmployeeID = await User.findOne({ employeeID });
        if (existingUserByEmployeeID) {
            return res.status(400).json({ message: "Employee ID is already registered." });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email is already registered." });
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be at least 6 characters long and include uppercase, lowercase letters, and numbers." });
        }
        
        // Generate a unique and complex email verification token
        const emailToken = crypto.randomBytes(32).toString('hex');

        const user = new User({
            employeeID,
            email,
            password,
            role,
            emailToken,
            isVerified: false
        });

        const newUser = await user.save();

        // Send verification email
        var mailOptions = {
            from: process.env.EMAIL,
            to: user.email,
            subject: "Verify Your Email for Employee Connect Suite",
            html: `<h1>Thanks for registering on our site</h1>
                    <p>Click on the following link to verify your email:</p>
                    <a href="http://${req.headers.host}/user/verify-email?token=${user.emailToken}">Verify Your Email</a> 
                    <p>If you didn't request a password reset, please ignore this email.</p>`,
        };
        //sending mail
        transporter.sendMail(mailOptions, function(error, info){
            if(error){
                console.log(error);
            }
            else{
                console.log("Verification emai; is sent to your gmail account");
            }
        });

        res.status(201).json({ message: "User created successfully. Please verify your email to complete registration." });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to create user!" });
    }
});

router.get('/verify-email', async(req, res) =>{
    try{
        const token= req.query.token;
        const user = await User.findOne({emailToken: token})
        if(user){
            user.emailToken = null;
            user.isVerified = true;
            await user.save();
            res.redirect("http://localhost:3000/");
        }
        else{
            res.redirect("http://localhost:3000/general/SignUp");
            console.log("Email is not verified");
        }
    }
    catch(err){
        console.log(err);
    }
});

// Login
router.get('/login', (req, res) => {
    res.render('login');
});

// Function to create JWT Token
const createToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '3d' });
};

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email is not registered." });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Wrong Password." });
        }

        if (!user.isVerified) {
            return res.status(403).json({ message: "Email not verified. Please verify your email." });
        }

        const token = createToken(user);

        res.status(200).json({ message: "Login successful", token });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Failed to login!" });
    }
});

//Send email details
var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL_USERNAME,
        password: process.env.EMAIL_PASSWORD
    },
    tls:{
        rejectUnauthorized: false
    }
});

module.exports = router;

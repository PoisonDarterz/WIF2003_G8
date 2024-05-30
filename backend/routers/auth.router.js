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

// Initialize nodemailer transporter
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

// Function to create JWT Token
const createToken = (user) => {
    return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET);
};

// SignUp
router.post('/register', async (req, res) => {
    try {
        const { employeeID, email, password, role } = req.body;

        // Check if user already exists
        const existingUserByEmployeeID = await User.findOne({ employeeID });
        if (existingUserByEmployeeID) {
            return res.status(400).json({ message: "Employee ID is already registered." });
        }

        const existingUserByEmail = await User.findOne({ email });
        if (existingUserByEmail) {
            return res.status(400).json({ message: "Email is already registered." });
        }

        // Validate password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(password)) {
            return res.status(400).json({ message: "Password must be at least 6 characters long and include uppercase, lowercase letters, and numbers." });
        }
        
        // Generate a unique and complex email verification token
        const emailToken = crypto.randomBytes(32).toString('hex');

        // Set email token expiration date (e.g., 1 day from now)
        const emailTokenExpiration = Date.now() + 24 * 60 * 60 * 1000;

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user with emailTokenExpiration
        const user = new User({
            employeeID,
            email,
            password: hashedPassword,
            role,
            emailToken,
            emailTokenExpiration, 
            isVerified: false
        });

        // Save user to database
        await user.save();

        // Send verification email
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: "Verify Your Email for Employee Connect Suite",
            html: `<h1>Thanks for registering on our site</h1>
                    <p>Click on the following link to verify your email:</p>
                    <a href="http://${req.headers.host}/api/auth/verify-email?token=${user.emailToken}">Verify Your Email</a> 
                    <p>If you didn't register to this site, please ignore this email.</p>`,
        };

        // Sending mail
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Failed to send verification email." });
            } else {
                console.log("Verification email is sent to your email account");
                return res.status(201).json({ message: "User created successfully. Please verify your email to complete registration." });
            }
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to create user!" });
    }
});

// Verify email
router.get('/verify-email', async (req, res) => {
    try {
        const token = req.query.token;
        const user = await User.findOne({ emailToken: token });

        if (!user) {
            return res.redirect(`http://localhost:3000/general/SignUp`);
        }

        // Check if the email token has expired
        if (user.emailTokenExpiration < Date.now()) {
            return res.status(400).json({ message: "Email verification token has expired. Please register again." });
        }

        user.emailToken = null;
        user.emailTokenExpiration = null;
        user.isVerified = true;
        await user.save();

        return res.redirect(`http://localhost:3000/`);
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to verify email!" });
    }
});

// Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Email is not registered." });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(400).json({ message: "Wrong Password." });
        }

        // Check if email is verified
        if (!user.isVerified) {
            return res.status(403).json({ message: "Email not verified. Please verify your email." });
        }

        // Create JWT token
        const token = createToken(user);

        // Set cookie
        res.cookie('token', token, { httpOnly: true, secure: true });

        // Log cookies in console
        console.log("Cookies:", req.cookies);

        // Send response
        return res.status(200).json({
            message: "Login successful",
            token,
            user: { _id: user._id, role: user.role },
        });

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to login!" });
    }
});

// Logout
router.post('/logout', (req, res) => {
    try {
        // Clear the token cookie
        res.clearCookie('token');

        // Log a message to the console
        console.log('User logged out and token cookie cleared successfully.');

        // Send a success message
        return res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error('An error occurred during logout:', error);
        return res.status(500).json({ message: "Failed to logout" });
    }
});

// Forgot Password
router.post('/forgot-password', async (req, res) => {
    try {
        const { email } = req.body;

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "Email not found." });
        }

        // Generate reset password token
        const resetToken = crypto.randomBytes(32).toString('hex');
        user.resetToken = resetToken;
        user.resetTokenExpiration = Date.now() + 24 * 60 * 60 * 1000 //expire in 1d
        await user.save();

        // Send reset password email
        const mailOptions = {
            from: process.env.EMAIL_USERNAME,
            to: user.email,
            subject: "Reset Your Password for Employee Connect Suite",
            html: `<h1>Reset Your Password</h1>
                    <p>You are receiving this email because you (or someone else) have requested to reset the password for your account.</p>
                    <p>Please click on the following link to reset your password:</p>
                    <a href="http://localhost:3000/general/ResetPassword/${resetToken}">Reset Password</a>
                    <p>If you didn't request a password reset, please ignore this email.</p>`,
        };

        // Sending mail
        transporter.sendMail(mailOptions, function(error, info) {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "Failed to send reset password email." });
            } else {
                console.log("Reset password email is sent to your email account");
                return res.status(200).json({ message: "Reset password email sent successfully." });
            }
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to process reset password request." });
    }
});

// Reset Password
router.post('/reset-password/:token', async (req, res) => {
    try {
        const resetToken = req.params.token;
        const { newPassword } = req.body;

        // Validate new password
        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d]{6,}$/;
        if (!passwordRegex.test(newPassword)) {
            return res.status(400).json({ message: "Password must be at least 6 characters long and include uppercase, lowercase letters, and numbers." });
        }

        // Find user by reset token
        const user = await User.findOne({ resetToken });

        // Check if user exists
        if (!user) {
            return res.status(400).json({ message: "Invalid reset password token." });
        }

        // Check if reset token is expired
        if (user.resetTokenExpiration < Date.now()) {
            return res.status(400).json({ message: "Expired reset password token." });
        }

        // Hash new password and update user's password
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        user.resetToken = null;
        user.resetTokenExpiration = null;
        await user.save();

        return res.status(200).json({ message: "Password reset successfully." });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Failed to reset password." });
    }
});

module.exports = router;
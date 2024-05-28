const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    employeeID: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ['Admin', 'Employee'],
        default: 'Employee'
    },
    emailToken: {
        type: String
    },
    emailTokenExpiration: {
        type: Date
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetToken: {
        type: String
    },
    resetTokenExpiration: {
        type: Date
    },
    date: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model('User', userSchema);

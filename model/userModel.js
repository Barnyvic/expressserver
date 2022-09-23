const mongoose = require('mongoose');

// Creating userSchema

const userSchema = new mongoose.Schema(
    {
        Name: {
            type: String,
            required: true
        },
        Email: {
            type: String,
            required: true,
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please add a valid E-mail']
        },
        Password: {
            type: String,
            minlength: [6, 'Password must be at least 6 characters long'],
            match: [/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/, 'Password must contain at least 1 uppercase letter, 1 lowercase letter and 1 number']
        },
        UserName: {
            type: String,
            required: true
        },
        dateOfbirth: {
            type: Date
        },
        Role: { type: String, enum: ['Admin', 'Reader'] },
        TOKEN: {
            type: String
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);

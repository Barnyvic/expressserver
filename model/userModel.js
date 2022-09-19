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
            required: true
        },
        Password: {
            type: String
        },
        UserName: {
            type: String,
            required: true
        },
        dateOfbirth: {
            type: Date
        }
    },
    {
        timestamps: true
    }
);

module.exports = mongoose.model('User', userSchema);

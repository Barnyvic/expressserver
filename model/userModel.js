const mongoose = require('mongoose');

// Creating userSchema 

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
    },
    role: {
        type: String,
        required: true
    },
    dateOfbirth: {
        type: Date,
        default: Date.now
    },
},{
    timestamps:true
})


module.exports = mongoose.model('User', userSchema);
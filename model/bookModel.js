const mongoose = require('mongoose');

const bookShema = new mongoose.Schema({
    isbn: {
        type: Number,
        required: true
    },
    bookTitle: {
        type: String,
        required: true
    },
    bookAuthor: {
        type: String,
        required: true
    },
    bookDescription: {
        type: String,
        required: true
    }
},{
    timestamps:true
})


module.exports = mongoose.model('BOOKS', bookShema);
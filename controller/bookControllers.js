const BOOKS = require('../model/bookModel');

// getting AllBooks  from DATABASE
const getAllBooks = async (req, res) => {
    try {
        const AllBooks = await BOOKS.find();
        res.send(AllBooks).status(200);
    } catch (error) {
        console.log(error.message.red);
        res.send(error.message).status(400);
    }
};

// Creating a new book
const CreateBooks = async (req, res) => {
    const Book = new BOOKS(req.body);
    try {
        await Book.save();
        res.send(Book).status(201);
    } catch (error) {
        console.log(error.message.red);
        res.send(error.message);
    }
};

const UpdateABook = async (req, res) => {
    res.send('hello world this is to update an existing book');
};

const DeleteABook = async (req, res) => {
    res.send('hello world this is to delete an existing book');
};

module.exports = { getAllBooks, CreateBooks, UpdateABook, DeleteABook };

const BOOKS = require('../model/bookModel');

// getting AllBooks  from DATABASE
const getAllBooks = async (req, res) => {
    try {
        const AllBooks = await BOOKS.find();
        res.send(AllBooks).status(200);
    } catch (error) {
        console.log(error.message.red);
        res.status(400).send(error.message);
    }
};

// Creating a new book
const CreateBooks = async (req, res) => {
    const { isbn, booktitle, bookauthor, bookdescription } = req.body;

    if (!(isbn || booktitle || bookauthor || bookdescription)) return res.status(400).send('All Input-Field Required.');
    try {
        const Newbook = await BOOKS.create({
            ISBN: isbn,
            bookTitle: booktitle,
            bookAuthor: bookauthor,
            bookDescription: bookdescription
        });

        res.status(201).send('Book created successfully....');
    } catch (error) {
        console.log(error.message.red);
        res.status(400).send(error.message);
    }
};

const UpdateABook = async (req, res) => {
    // res.send('hello world this is to update an existing book');
};

const DeleteABook = async (req, res) => {
    // res.send('hello world this is to delete an existing book');
};

module.exports = { getAllBooks, CreateBooks, UpdateABook, DeleteABook };

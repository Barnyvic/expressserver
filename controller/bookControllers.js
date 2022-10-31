const BOOKS = require('../model/bookModel');

// getting AllBooks  from DATABASE
const getAllBooks = async (req, res) => {
    // implementing pagination
    const { page, limit } = req.query;
    // implementing search in the api
    let filter = {};
    if (req.query.bookauthor) {
        filter = { bookAuthor: req.query.bookauthor };
    }
    try {
        const AllBooks = await BOOKS.find(filter)
            .limit(limit * 1)
            .skip((page - 1) * limit)
            .exec();
        const result = AllBooks.map((book) => ({
            ID: book._id,
            ISBN: book.ISBN,
            AUTHOR: book.bookAuthor,
            TITLE: book.bookTitle,
            DESCRIPTION: book.bookDescription
        }));
        res.status(200).send({ date: result, totalPages: Math.ceil(page / limit), currentPage: page });
    } catch (error) {
        console.log(error.message.red);
        res.status(400).send(error.message);
    }
};

const getAbook = async (req, res) => {
    try {
        const Abook = await BOOKS.findOne({
            _id: req.params.id
        });
        res.status(200).send(Abook);
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
    try {
        const book = await BOOKS.findByIdAndUpdate(
            req.params.id,
            { $set: { ISBN: req.body.isbn, bookTitle: req.body.booktitle, bookAuthor: req.body.bookauthor, bookDescription: req.body.bookdescription } },
            {
                new: true
            }
        );
        book.save();
        res.status(200).send({ data: book });
    } catch {
        res.status(404).send({ error: 'Book is not found!' });
    }
};

const DeleteABook = async (req, res) => {
    try {
        const DELTEbook = await BOOKS.findByIdAndDelete(req.params.id);
        if (!DELTEbook) return res.status(400).send('Book not found.');
        res.status(200).send('Book deleted successfully....');
    } catch (error) {
        console.log(error.message.red);
        res.status(404).send(error.message);
    }
};

module.exports = { getAllBooks, CreateBooks, UpdateABook, DeleteABook, getAbook };

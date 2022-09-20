const express = require('express');
const Bookrouter = express.Router();
const { getAllBooks, CreateBooks, UpdateABook, DeleteABook } = require('../controller/bookControllers');
const VerifyToken = require('.././authentication/autentication');

// BOOK ROUTES
//GET ROUTES AND POST
Bookrouter.route('/').get(getAllBooks).post(VerifyToken, CreateBooks);

// UPDATE AND DELETE
Bookrouter.route('/:id').put(UpdateABook).delete(DeleteABook);

module.exports = Bookrouter;

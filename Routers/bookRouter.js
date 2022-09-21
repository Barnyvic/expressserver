const express = require('express');
const Bookrouter = express.Router();
const { getAllBooks, CreateBooks, UpdateABook, DeleteABook } = require('../controller/bookControllers');
const { VerifyToken, authorizeUser } = require('../middleware/autentication');

// BOOK ROUTES
//GET ROUTES AND POST
Bookrouter.route('/').get(getAllBooks).post(VerifyToken, authorizeUser, CreateBooks);

// UPDATE AND DELETE
Bookrouter.route('/:id').put(UpdateABook).delete(DeleteABook);

module.exports = Bookrouter;

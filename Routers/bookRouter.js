const express = require('express');
const Bookrouter = express.Router();
const { getAllBooks, CreateBooks, UpdateABook, DeleteABook } = require('../controller/bookControllers');
const { authorizeUser } = require('../authentication/authorization');

// BOOK ROUTES
//GET ROUTES AND POST
Bookrouter.route('/').get(getAllBooks).post(authorizeUser, CreateBooks);

// UPDATE AND DELETE
Bookrouter.route('/:id').put(UpdateABook).delete(DeleteABook);

module.exports = Bookrouter;

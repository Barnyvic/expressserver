const express = require('express');
const Bookrouter = express.Router();
const { getAllBooks, CreateBooks, UpdateABook, DeleteABook, getAbook } = require('../controller/bookControllers');
const { authorizeUser } = require('../middleware/autentication');

// BOOK ROUTES
//GET ROUTES AND POST
Bookrouter.route('/').get(getAllBooks).post(authorizeUser, CreateBooks);

// UPDATE AND DELETE
Bookrouter.route('/:id').put(UpdateABook).delete(DeleteABook).get(getAbook);

module.exports = Bookrouter;

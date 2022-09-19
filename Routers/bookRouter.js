const express = require('express');
const Bookrouter = express.Router();
const { getAllBooks, CreateBooks, UpdateABook, DeleteABook, authenticateUser } = require('../controller/bookControllers');

Bookrouter.route('/').get(authenticateUser, getAllBooks).post(CreateBooks);
Bookrouter.route('/:id').put(UpdateABook).delete(DeleteABook);

module.exports = Bookrouter;

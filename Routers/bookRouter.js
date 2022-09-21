const express = require('express');
const Bookrouter = express.Router();
const { getAllBooks, CreateBooks, UpdateABook, DeleteABook, getAbook } = require('../controller/bookControllers');
const { VerifyToken, authorizeUser } = require('../middleware/autentication');

// BOOK ROUTES
//GET ROUTES AND POST
Bookrouter.route('/').get(VerifyToken, getAllBooks).post(VerifyToken, authorizeUser, CreateBooks);

// UPDATE AND DELETE
Bookrouter.route('/:id').put(VerifyToken, UpdateABook).delete(VerifyToken, DeleteABook).get(VerifyToken, getAbook);

module.exports = Bookrouter;

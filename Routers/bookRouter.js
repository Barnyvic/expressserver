const express = require('express');
const Bookrouter = express.Router();
const {getAllBooks, CreateBooks, UpdateABook, DeleteABook} = require("../controller/bookControllers")


Bookrouter.route("/").get(getAllBooks).post(CreateBooks);
Bookrouter.route("/:id").put(UpdateABook).delete(DeleteABook)



module.exports = Bookrouter;

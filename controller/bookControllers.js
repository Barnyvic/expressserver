const BOOKS = require("../model/bookModel");
const User = require("../model/userModel"); 




const getAllBooks = (req,res)=> {
    res.send("hello world");
}


const CreateBooks = (req,res)=> {
    res.send("hello world this is to create a new book");
};


const UpdateABook = (req,res)=> {
    res.send("hello world this is to update an existing book");
}

const DeleteABook = (req,res)=> {
    res.send("hello world this is to delete an existing book");
}



module.exports = {getAllBooks, CreateBooks, UpdateABook, DeleteABook};
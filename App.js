'use strict';
// importing express package for creating the express server
const express = require('express');
const dotenv = require('dotenv').config();
const colors = require('colors');
const LocalHost = "localhost";
const PORT = process.env.PORT || 4000;
const connectDB = require("./config/db.config")
const userRouter = require("./Routers/userRouter")
const Bookrouter = require('./Routers/bookRouter')



const app = express();// creating an express object
app.use(express.json());
// connecting to Mongodb database
connectDB()
// for mounting static files to express server
app.use(express.static(__dirname+'public/'));
// user Routes
app.use("/users", userRouter);
// book Routes
app.use("/book", Bookrouter);

// Handling errors 
app.use((err,req,res,next)=>{
    if(err) return res.send(" an error occured".red)
    next()
})




//handling all invalid routes:
app.get('*', function(req, res){
    res.status(404).send("Invalid routes:");
});







app.listen(PORT,LocalHost,()=>{
    console.log(`Server listening on http://${LocalHost}:${PORT}`.yellow);
});
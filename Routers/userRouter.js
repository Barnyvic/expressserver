const express = require('express');
const userRouter = express.Router();
const { getAllUsers, createNewUser, UpdateUser, deleteUser, login } = require('../controller/userController');

// route for post and getAllUsers
userRouter.route('/').get(getAllUsers).post(createNewUser);
userRouter.route('/login').post(login);

// Route for delete and updateUsers
userRouter.route('/:id').put(UpdateUser).delete(deleteUser);

module.exports = userRouter;

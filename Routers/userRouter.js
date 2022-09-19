const express = require('express');
const userRouter = express.Router();
const {getAllUsers,createNewUser,UpdateUser,deleteUser} = require("../controller/userController")



// route for post and getAllUsers
userRouter.route('/').get(getAllUsers).post(createNewUser)




// Route for delete and updateUsers
userRouter.route('/:id').put(UpdateUser).delete(deleteUser)




module.exports = userRouter;
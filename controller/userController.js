const User = require('../model/userModel');

//GETTING ALL USERS FROM DATABASE
const getAllUsers = async (req, res) => {
    // finding tthe list of users in the databse
    const users = await User.find();
    // Changing the format at which the users are returned
    const USER = users.map((user) => ({
        ID: user.id,
        Name: user.name,
        Email: user.email,
        DateOFBirth: user.dateOfbirth.toString(),
        Role: user.role
    }));
    // sending the user back to the frontend
    res.send(USER).status(200);
};

// CREATING A NEW USER
const createNewUser = async (req, res) => {
    // getting the users from req.body
    const user = new User(req.body);
    try {
        // Getting already exsiting users from the database
        const Allusers = await User.find();
        // checking if user already exsis in the databases
        userName = Allusers.find((users) => users.name === user.name);
        if (userName) return res.send('User already exists');
        // Saving the new user to the database
        await user.save();
        // sending tthe user back
        res.send(user).status(201);
    } catch (error) {
        console.log(error.message.red);
        res.send(error.message).status(400);
    }
};

// LOGIN A USER
const login = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        if (!user) return res.status(403).send('User not  registered');
        if (user.password !== req.body.password) return res.status(403).send('Email or Password not correct');
        req.userId = user.id;
        return res.send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

// UPDATING USER TO DATABASE

const UpdateUser = async (req, res) => {
    try {
        const Updateuser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.send(`${Updateuser} has been updated sucessfully`).status(200);
    } catch (error) {
        console.log(error.message.red);
        res.send(error.message).status(400);
    }
};

// DELLETING A USER FROM DATABASE

const deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (!deleteUser) return res.send('User does not exist');
        res.send(`DELETED sucessfully`).status(200);
    } catch (error) {
        console.log(error.message.red);
        res.send(error.message).status(400);
    }
};

module.exports = { getAllUsers, createNewUser, UpdateUser, deleteUser, login };

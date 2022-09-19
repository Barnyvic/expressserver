const User = require('../model/userModel');
const bcrypt = require('bcrypt');

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
    const { name, email, password, UserName, dateOfbirth } = req.body;

    try {
        // Getting already exsiting users from the database
        const user = await User.findOne({ email, name });
        // checking if user already exsis in the databases
        if (user) return res.status(400).send('User already exists');

        // Hashing the password
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        // Saving the new user to the database
        const NewUser = await User.create({
            Name: name,
            Email: email,
            Password: hashPassword,
            dateOfbirth: dateOfbirth.toString(),
            UserName: UserName
        });

        // sending tthe user back
        res.send(NewUser).status(201);
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

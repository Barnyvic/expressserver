const User = require('../model/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

//GETTING ALL USERS FROM DATABASE
const getAllUsers = async (req, res) => {
    // finding tthe list of users in the databse
    const users = await User.find();
    // Changing the format at which the users are returned
    const USER = users.map((user) => ({
        ID: user.id,
        Name: user.Name,
        Email: user.Email,
        DateOFBirth: user.dateOfbirth.toString(),
        UserName: user.UserName
    }));
    // sending the user back to the frontend
    res.status(200).send(USER);
};

// CREATING A NEW USER
const createNewUser = async (req, res) => {
    try {
        // Get user input.
        const { name, email, password, UserName, dateOfbirth, role } = req.body;

        //Validate user input
        if (!(email && password && name && dateOfbirth, role)) {
            res.status(400).send('All input is required');
        }

        // Validate if the user already exists.
        const Allusers = await User.find();
        const oneUser = Allusers.find((user) => user.Name === name);
        // checking if user already exsis in the databases
        if (oneUser) return res.status(409).send('User Already Exist. Please Login');

        // Encrypt the user password.
        const salt = await bcrypt.genSalt(12);
        const hashPassword = await bcrypt.hash(password, salt);

        // Create a user in our database.
        const NewUser = await User.create({
            Name: name,
            Email: email,
            Password: hashPassword,
            dateOfbirth: dateOfbirth,
            UserName: UserName,
            Roles: [role]
        });

        //create a signed JWT token.
        const token = jwt.sign({ userId: NewUser._id }, process.env.JWT_SECRET, { expiresIn: '3h' });
        NewUser.TOKEN = token;

        // sending tthe user back
        res.status(201).send(NewUser);
    } catch (error) {
        console.log(error.message.red);
        res.status(400).send(error.message);
    }
};

// LOGIN A USER
const login = async (req, res) => {
    // Get user input
    const { Username, Password } = req.body;
    // Validate user input
    if (!(Username && Password)) return res.status(400).send('All input is required');
    try {
        // Validate if the user exists.
        const users = await User.find();
        const user = users.find((user) => user.UserName === Username);

        // If user is not found in the database
        if (!user) return res.status(403).send('User not  registered');

        // Verify user password against the password we saved earlier in our database.
        if (user && (await bcrypt.compare(Password, user.Password))) {
            //create a signed JWT token
            const token = jwt.sign({ Username, userId: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
            user.TOKEN = token;

            // sending back to the user
            res.status(200).send(user);
        } else return res.status(403).send('Incorrect password');
    } catch (error) {
        res.status(500).send(error.message);
    }
};

// UPDATING USER TO DATABASE

const UpdateUser = async (req, res) => {
    try {
        const Updateuser = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        res.status(200).send(`${Updateuser} has been updated sucessfully`);
    } catch (error) {
        console.log(error.message.red);
        res.status(400).send(error.message);
    }
};

// DELLETING A USER FROM DATABASE

const deleteUser = async (req, res) => {
    try {
        const deleteUser = await User.findByIdAndDelete(req.params.id);
        if (!deleteUser) return res.send('User does not exist');
        res.status(200).send(`DELETED sucessfully`);
    } catch (error) {
        console.log(error.message.red);
        res.status(400).send(error.message);
    }
};

module.exports = { getAllUsers, createNewUser, UpdateUser, deleteUser, login };

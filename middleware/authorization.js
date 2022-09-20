const User = require('../model/userModel');

// authenticate if user exist in the DATABASES
const authorizeUser = async (req, res, next) => {
    const authorization = req.headers['authorization'];
    if (!authorization) return res.status(403).send('Unauthorized access');
    try {
        //checking if user exist in the DATABASES;
        const users = await User.findById(authorization);
        if (!users) return res.send('Invalid Name or Password').status(400);
        next();
    } catch (error) {
        console.log(error.message.red);
        res.send(error.message);
    }
};

module.exports = { authorizeUser };

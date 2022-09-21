const jwt = require('jsonwebtoken');
const User = require('.././model/userModel');

// authenticating user

const VerifyToken = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(403).send('You must log in to access this Resource');
    }
    const TOKEN = token.split(' ')[1];

    try {
        const decryptedToken = jwt.verify(TOKEN, process.env.JWT_SECRET);
        req.cookies = await User.findById(decryptedToken.userId);
        next();
    } catch (error) {
        console.log(error.message.red);
        res.status(401).send(error.message);
    }
};

const authorizeUser = async (req, res, next) => {
    try {
        const { Roles } = req.cookies;
        if (Roles.includes('Admin')) {
            next();
        } else {
            res.status(401).send('You are not Authorized to open this file...');
        }
    } catch (error) {
        console.log(error.message.red);
        res.status(401).send(error.message);
    }
};

module.exports = { VerifyToken, authorizeUser };

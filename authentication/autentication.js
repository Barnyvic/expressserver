const jwt = require('jsonwebtoken');

// authenticating user

const VerifyToken = (req, res, next) => {
    const token = req.headers.authorization.split(' ')[1];

    if (!token) return res.status(403).send('A token is required for authentication');

    try {
        const decryptedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decryptedToken;
    } catch (error) {
        console.log(error.message.red);
        res.status(401).send(error.message);
    }
    return next();
};

module.exports = VerifyToken;

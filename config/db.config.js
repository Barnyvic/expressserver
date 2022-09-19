const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log('Connected to Mongo'.blue);
    } catch (error) {
        next(error)
        console.log(error);
    }
};


module.exports = connectDB;
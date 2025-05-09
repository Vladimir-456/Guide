const mongoose = require('mongoose');

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

const connectDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, options);
        console.log(`MongoDB connected: ${connect.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1);
    }
}

module.exports = connectDB;


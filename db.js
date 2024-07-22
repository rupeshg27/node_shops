const mongoose = require('mongoose');

const mongoURL = 'mongodb://127.0.0.1:27017/shops'; // Update 'mydatabase' to your database name

mongoose.connect(mongoURL).then(() => {
    console.log('Connected to MongoDB');
}).catch((err) => {
    console.error('MongoDB connection error:', err);
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('Mongoose connected to DB');
});

db.on('error', (err) => {
    console.error('Mongoose connection error:', err);
});

db.on('disconnected', () => {
    console.log('Mongoose disconnected');
});

module.exports = db;

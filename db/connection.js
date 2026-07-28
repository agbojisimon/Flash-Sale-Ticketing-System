const mongoose = require('mongoose');

const connectPromise = mongoose.connect('mongodb://127.0.0.1:27017/flashsale');

connectPromise
	.then(() => {
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		console.error('MongoDB connection failed:', error.message);
	});

module.exports = connectPromise;
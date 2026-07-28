// MongoDB connection bootstrap for the backend.
const mongoose = require('mongoose');

const connectPromise = mongoose.connect('mongodb://127.0.0.1:27017/flashsale');

connectPromise
	.then(() => {
		// Confirm the database connection is ready.
		console.log('Connected to MongoDB');
	})
	.catch((error) => {
		// Report connection errors at startup.
		console.error('MongoDB connection failed:', error.message);
	});

module.exports = connectPromise;
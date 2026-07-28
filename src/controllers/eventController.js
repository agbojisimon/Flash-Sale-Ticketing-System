// Controller for event listing and creation requests.
const eventService = require('../services/eventService');

// Get all events and return the service response.
async function getEvents(req, res) {
	const result = await eventService.getEvents();
	return res.status(result.statusCode).json(result.payload);
}

// Create an event and return the service response.
async function createEvent(req, res) {
	const result = await eventService.createEvent(req.body);
	return res.status(result.statusCode).json(result.payload);
}

module.exports = {
	getEvents,
	createEvent,
};
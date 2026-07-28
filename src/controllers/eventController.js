const eventService = require('../services/eventService');

async function getEvents(req, res) {
	const result = await eventService.getEvents();
	return res.status(result.statusCode).json(result.payload);
}

async function createEvent(req, res) {
	const result = await eventService.createEvent(req.body);
	return res.status(result.statusCode).json(result.payload);
}

module.exports = {
	getEvents,
	createEvent,
};
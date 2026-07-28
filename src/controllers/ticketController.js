const ticketService = require('../services/ticketService');

async function getTickets(req, res) {
	const result = await ticketService.getTickets();
	return res.status(result.statusCode).json(result.payload);
}

async function createTicket(req, res) {
	const result = await ticketService.createTicket(req.body);
	return res.status(result.statusCode).json(result.payload);
}

module.exports = {
	getTickets,
	createTicket,
};

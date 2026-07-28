// Controller for ticket status and purchase requests.
const ticketService = require('../services/ticketService');

// Get ticket status data and send the service response.
async function getTicketStatus(req, res) {
	const result = await ticketService.getTicketStatus();
	return res.status(result.statusCode).json(result.payload);
}

// Purchase a ticket and return the service response.
async function purchaseTicket(req, res) {
	const result = await ticketService.purchaseTicket(req.body);
	return res.status(result.statusCode).json(result.payload);
}

module.exports = {
	getTicketStatus,
	purchaseTicket,
};

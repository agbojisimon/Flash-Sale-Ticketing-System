// Ticket API routes for status and purchase actions.
const express = require('express');
const ticketController = require('../controllers/ticketController');
const idempotencyKey = require('../middlewares/idempotencyKey');

const router = express.Router();

// GET /api/tickets/status returns ticket status data.
router.get('/status', ticketController.getTicketStatus);

// POST /api/tickets/purchase creates or reuses a ticket purchase.
router.post('/purchase', idempotencyKey, ticketController.purchaseTicket);

module.exports = router;
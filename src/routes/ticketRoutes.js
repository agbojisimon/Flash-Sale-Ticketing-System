const express = require('express');
const ticketController = require('../controllers/ticketController');
const idempotencyKey = require('../middlewares/idempotencyKey');

const router = express.Router();

router.get('/status', ticketController.getTickets);

router.post('/purchase', idempotencyKey, ticketController.createTicket);

module.exports = router;
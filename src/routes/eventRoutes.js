// Event API routes for listing and creating events.
const express = require('express');
const eventController = require('../controllers/eventController');

const router = express.Router();

// GET /api/events returns stored events.
router.get('/', eventController.getEvents);

// POST /api/events creates a new event.
router.post('/', eventController.createEvent);

module.exports = router;
// Event service for listing and creating event records.
const Event = require('../models/event');

// Return all stored events.
async function getEvents() {
  try {
    const events = await Event.find();

    if (!events.length) {
      return {
        statusCode: 404,
        payload: { message: 'Events not found' },
      };
    }

    return {
      statusCode: 200,
      payload: events,
    };
  } catch (error) {
    return {
      statusCode: 500,
      payload: { message: 'Failed to fetch events', error: error.message },
    };
  }
}

// Create a new event record from the request payload.
async function createEvent(eventData) {
  const { name, totalTickets, availableTickets } = eventData;

  // Validate required event fields before writing to the database.
  if (!name || totalTickets === undefined || availableTickets === undefined) {
    return {
      statusCode: 400,
      payload: { message: 'name, totalTickets, and availableTickets are required' },
    };
  }

  if (typeof name !== 'string') {
    return {
      statusCode: 400,
      payload: { message: 'name must be a string' },
    };
  }

  if (Number.isNaN(Number(totalTickets)) || Number.isNaN(Number(availableTickets))) {
    return {
      statusCode: 400,
      payload: { message: 'totalTickets and availableTickets must be numbers' },
    };
  }

  try {
    // Store the event with normalized ticket counts.
    const event = await Event.create({
      name: name.trim(),
      totalTickets: Number(totalTickets),
      availableTickets: Number(availableTickets),
    });

    return {
      statusCode: 201,
      payload: event,
    };
  } catch (error) {
    return {
      statusCode: 500,
      payload: { message: 'Failed to create event', error: error.message },
    };
  }
}

module.exports = {
  getEvents,
  createEvent,
};
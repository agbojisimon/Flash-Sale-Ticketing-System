const Event = require('../models/event');

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

async function createEvent(eventData) {
  const { name, totalTickets, availableTickets } = eventData;

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
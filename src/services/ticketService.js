const mongoose = require('mongoose');
const Order = require('../models/order');
const Event = require('../models/event');
const { getMutex } = require('../utils/mutex');

async function getTickets() {
  try {
    const tickets = await Order.find();

    if (!tickets.length) {
      return {
        statusCode: 404,
        payload: { message: 'Tickets not found' },
      };
    }

    return {
      statusCode: 200,
      payload: tickets,
    };
  } catch (error) {
    return {
      statusCode: 500,
      payload: { message: 'Failed to fetch tickets', error: error.message },
    };
  }
}

async function createTicket(ticketData) {
  const { userId, eventId, idempotencyKey, status } = ticketData;

  if (!mongoose.isValidObjectId(userId) || !mongoose.isValidObjectId(eventId)) {
    return {
      statusCode: 400,
      payload: { message: 'Invalid userId or eventId' },
    };
  }

  const eventMutex = getMutex(`event:${eventId}`);

  try {
    return await eventMutex.runExclusive(async () => {
      const event = await Event.findById(eventId);

      if (!event) {
        return {
          statusCode: 404,
          payload: { message: 'Event not found' },
        };
      }

      if (event.availableTickets <= 0) {
        return {
          statusCode: 409,
          payload: { message: 'Tickets sold out' },
        };
      }

      event.availableTickets -= 1;
      await event.save();

      try {
        const ticket = await Order.create({
          userId,
          eventId,
          idempotencyKey,
          status,
        });

        return {
          statusCode: 201,
          payload: ticket,
        };
      } catch (error) {
        event.availableTickets += 1;
        await event.save();

        if (error.code === 11000) {
          const existingOrder = await Order.findOne({ idempotencyKey });

          if (existingOrder) {
            return {
              statusCode: 200,
              payload: existingOrder,
            };
          }
        }

        return {
          statusCode: 500,
          payload: { message: 'Failed to create ticket', error: error.message },
        };
      }
    });
  } catch (error) {
    return {
      statusCode: 500,
      payload: { message: 'Failed to create ticket', error: error.message },
    };
  }
}

module.exports = {
  getTickets,
  createTicket,
};
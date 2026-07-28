// Event schema for event metadata and ticket availability.
const mongoose = require('mongoose');

// Store event name, total tickets, and remaining tickets.
const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    totalTickets: {
      type: Number,
      required: true,
      min: 0,
    },
    availableTickets: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: true,
  }
);

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;
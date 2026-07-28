// Order schema for ticket purchases and idempotency tracking.
const mongoose = require('mongoose');

// Store the user, event, unique request key, and order status.
const orderSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
    eventId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'Event',
    },
    idempotencyKey: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      trim: true,
      default: 'pending',
    },
  },
  {
    timestamps: true,
  }
);

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
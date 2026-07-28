// Main Express application entry point.
const express = require('express');
const app = express();

// Server port.
const Port = process.env.PORT || 5000;

// Database connection setup.
const connectToDatabase = require('./db/connection');

// Shared mutex registry for concurrency control.
require('./src/utils/mutex');

// Global middleware registration.
const logger = require('./src/middlewares/logger');

// Ticket routes.
const ticketRoutes = require('./src/routes/ticketRoutes');

// Event routes.
const eventRoutes = require('./src/routes/eventRoutes');

// Parse JSON request bodies and log incoming requests.
app.use(express.json());
app.use(logger);

// Basic health check route.
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/tickets', ticketRoutes);
app.use('/api/events', eventRoutes);

async function startServer() {
  try {
    // Wait for MongoDB before accepting requests.
    await connectToDatabase;

    app.listen(Port, () => {
      console.log(`Server is running on port ${Port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();
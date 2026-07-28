//Import express and create an instance of the app
const express = require('express');
const app = express();

//Server port
const Port = process.env.PORT || 5000;

//Database connection
const connectToDatabase = require('./db/connection');

//Shared mutex registry
require('./src/utils/mutex');

//Middlewares
const logger = require('./src/middlewares/logger');

//the ticket routes
const ticketRoutes = require('./src/routes/ticketRoutes');

//the event routes
const eventRoutes = require('./src/routes/eventRoutes');

//Middleware to parse JSON request bodies
app.use(express.json());
app.use(logger);

//Home page route
app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/tickets', ticketRoutes);
app.use('/api/events', eventRoutes);

async function startServer() {
  try {
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
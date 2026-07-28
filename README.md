# Flash Sale Ticketing System

Flash Sale Ticketing System is a technical assessment project that simulates a high-demand VIP ticket purchasing flow. It is designed to prevent overselling and duplicate purchases while keeping the backend simple, predictable, and easy to review.

## Features

- View remaining VIP tickets
- Purchase a VIP ticket
- Prevent overselling using a mutex/locking mechanism
- Idempotent purchase requests
- RESTful API
- Clean architecture using Routes, Controllers, Services, Models, Middleware, and Utilities

## Tech Stack

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose

### Frontend

- Next.js
- TypeScript
- Redux Toolkit
- RTK Query

## Project Structure

- `controllers`: Handle incoming requests and return responses from the service layer.
- `services`: Contain the business logic for ticket purchases, event handling, idempotency, and stock control.
- `routes`: Define the API endpoints and connect them to controllers and middleware.
- `models`: Define the MongoDB schemas for events and orders.
- `middlewares`: Handle cross-cutting concerns such as request logging and idempotency checks.
- `utils`: Provide shared utilities such as the mutex implementation used for concurrency control.

## API Endpoints

### Tickets

`GET /api/tickets/status`

Returns the remaining number of available VIP tickets.

`POST /api/tickets/purchase`

Purchases a ticket.

Request Body:

```json
{
  "userId": "string",
  "eventId": "string",
  "idempotencyKey": "string"
}
```

### Events

`GET /api/events`

`POST /api/events`

These endpoints are used to initialize and retrieve the conference event.

## Installation

```bash
npm install
npm run dev
```

## Environment Variables

Create a `.env` file in the project root and add the following variables:

```env
PORT=5000
MONGODB_URI=your_connection_string
```

## Concurrency

The application prevents overselling by using a mutex-based locking mechanism around the purchase flow. When multiple users attempt to buy the last available ticket at the same time, requests are serialized so only one purchase can succeed and the remaining requests fail gracefully.

## Idempotency

Repeated purchase requests that use the same `idempotencyKey` return the original successful purchase instead of creating duplicate orders.

## Notes

This project was intentionally limited to the assessment requirements and does not include authentication, payments, or other production-grade features.

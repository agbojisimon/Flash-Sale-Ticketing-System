// Request logger for GET and POST traffic.
function logger(req, res, next) {
  // Log only the methods used by this backend.
  if (req.method === 'GET' || req.method === 'POST') {
    console.log(`${req.method} ${req.originalUrl}`);
  }

  next();
}

module.exports = logger;
function logger(req, res, next) {
  if (req.method === 'GET' || req.method === 'POST') {
    console.log(`${req.method} ${req.originalUrl}`);
  }

  next();
}

module.exports = logger;
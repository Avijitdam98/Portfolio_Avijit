const rateLimit = require('express-rate-limit');

// Create a simple limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // Limit each IP to 100 requests per windowMs
});

// Simpler auth limiter
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 20 // 20 attempts per 15 minutes
});

module.exports = { limiter, authLimiter };

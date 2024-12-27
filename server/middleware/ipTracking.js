const mongoose = require('mongoose');

// IP Log Schema
const ipLogSchema = new mongoose.Schema({
  ip: String,
  endpoint: String,
  timestamp: { type: Date, default: Date.now },
  userAgent: String,
  blocked: { type: Boolean, default: false }
});

const IpLog = mongoose.model('IpLog', ipLogSchema);

// Middleware to track IP addresses
const trackIP = async (req, res, next) => {
  const ip = req.ip;
  const endpoint = req.originalUrl;
  const userAgent = req.headers['user-agent'];

  try {
    // Log the IP access
    await IpLog.create({
      ip,
      endpoint,
      userAgent
    });

    // Check if IP is blocked
    const isBlocked = await IpLog.findOne({ ip, blocked: true });
    if (isBlocked) {
      return res.status(403).json({ error: 'Access denied' });
    }

    next();
  } catch (error) {
    console.error('IP tracking error:', error);
    next();
  }
};

module.exports = { trackIP, IpLog };

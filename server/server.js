require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const cvRoutes = require('./routes/cv');
const adminRoutes = require('./routes/admin');
const auth = require('./middleware/auth');
const { limiter, authLimiter } = require('./middleware/rateLimit');
const { trackIP } = require('./middleware/ipTracking');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(trackIP); // Track all requests
app.use(limiter); // Apply rate limiting to all routes

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, 'uploads', 'cv');
const fs = require('fs');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));

// Serve uploaded files
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Public routes
app.use('/api/admin', authLimiter, adminRoutes); // Admin routes with stricter rate limiting
app.use('/api/cv/latest', limiter, cvRoutes); // Allow public access to latest CV
app.use('/api/cv', cvRoutes); // General CV routes

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  console.log('Environment variables loaded:', {
    ADMIN_EMAIL: process.env.ADMIN_EMAIL,
    JWT_SECRET: process.env.JWT_SECRET ? '[SET]' : '[NOT SET]',
    PORT: process.env.PORT
  });
});

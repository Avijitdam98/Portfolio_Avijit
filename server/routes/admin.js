const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// Admin routes go here
// Login route
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Login attempt:', { email, password });
        console.log('Expected:', { 
            email: process.env.ADMIN_EMAIL, 
            password: process.env.ADMIN_PASSWORD 
        });

        // For demo purposes, using hardcoded credentials
        // In production, you should use a database
        const validEmail = process.env.ADMIN_EMAIL;
        const validPassword = process.env.ADMIN_PASSWORD;

        if (!validEmail || !validPassword) {
            console.error('Environment variables not set:', { validEmail, validPassword });
            return res.status(500).json({ error: 'Server configuration error' });
        }

        if (email !== validEmail || password !== validPassword) {
            console.log('Invalid credentials');
            return res.status(401).json({ error: 'Invalid credentials' });
        }

        // Create token
        const token = jwt.sign(
            { email: validEmail },
            process.env.JWT_SECRET || 'fallback_secret',
            { expiresIn: '24h' }
        );

        console.log('Login successful');
        res.json({
            token,
            user: { email: validEmail }
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Server error' });
    }
});

// Validate token route
router.get('/validate', auth, (req, res) => {
    res.json({ valid: true });
});

// Protected route example
router.get('/', auth, (req, res) => {
    res.json({ message: 'Admin route working' });
});

module.exports = router;
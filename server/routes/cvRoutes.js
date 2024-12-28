const express = require('express');
const router = express.Router();
const { uploadCV, getLatestCV, listCVs, toggleActive, deleteCV } = require('../controllers/cvController');
const auth = require('../middleware/auth');

// Public routes
router.get('/latest', getLatestCV);

// Protected routes (require authentication)
router.post('/upload', auth, uploadCV);
router.get('/list', auth, listCVs);
router.patch('/:id/toggle-active', auth, toggleActive);
router.delete('/:id', auth, deleteCV);

module.exports = router;

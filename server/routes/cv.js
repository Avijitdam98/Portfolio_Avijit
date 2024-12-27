const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const CV = require('../models/CV');
const mongoose = require('mongoose');

// Ensure uploads directory exists
const uploadDir = path.join(__dirname, '../uploads/cv');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Ensure directory exists before saving
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // Generate a unique filename with timestamp
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const filename = 'cv-' + uniqueSuffix + path.extname(file.originalname);
    cb(null, filename);
  }
});

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  },
});

// List all CVs
router.get('/list', async (req, res) => {
  try {
    const cvs = await CV.find({}).sort({ uploadDate: -1 });
    res.json({
      total: cvs.length,
      cvs: cvs.map(cv => ({
        id: cv._id,
        title: cv.title,
        uploadDate: cv.uploadDate,
        isActive: cv.isActive,
        filename: cv.filename
      }))
    });
  } catch (error) {
    console.error('Error in /list:', error);
    res.status(500).json({ error: 'Failed to fetch CVs' });
  }
});

// Get latest CV
router.get('/latest', async (req, res) => {
  try {
    console.log('Fetching latest CV...');
    
    // First check if we have any CVs at all
    const allCVs = await CV.find({}).sort({ uploadDate: -1 });
    console.log('Total CVs found:', allCVs.length);
    
    if (allCVs.length === 0) {
      return res.status(404).json({ message: 'No CVs found in database' });
    }

    // Try to find an active CV
    const latestCV = await CV.findOne({ isActive: true }).sort({ uploadDate: -1 });
    console.log('Active CV:', latestCV);
    
    if (!latestCV) {
      // If no active CV, use the most recent one and make it active
      const mostRecentCV = allCVs[0];
      mostRecentCV.isActive = true;
      await mostRecentCV.save();
      console.log('Activated most recent CV:', mostRecentCV);
      
      // Use this CV
      latestCV = mostRecentCV;
    }

    if (!latestCV.filename) {
      console.log('CV file not found in database');
      return res.status(404).json({ message: 'CV file not found in database' });
    }

    // Try to decode base64 if it's stored that way
    if (latestCV.filename.includes('base64')) {
      console.log('Found base64 encoded CV, decoding...');
      const base64Data = latestCV.filename.replace(/^data:application\/pdf;base64,/, '');
      const buffer = Buffer.from(base64Data, 'base64');
      
      // Create a temporary file
      const tempFilename = 'cv-' + Date.now() + '.pdf';
      const tempFilePath = path.join(uploadDir, tempFilename);
      
      fs.writeFileSync(tempFilePath, buffer);
      console.log('Created temporary file:', tempFilePath);
      
      res.download(tempFilePath, 'Avijit_Dam_CV.pdf', (err) => {
        // Clean up temp file after download
        try {
          fs.unlinkSync(tempFilePath);
          console.log('Cleaned up temporary file');
        } catch (cleanupError) {
          console.error('Error cleaning up temp file:', cleanupError);
        }
        
        if (err) {
          console.error('Error downloading file:', err);
          if (!res.headersSent) {
            res.status(500).json({ error: 'Failed to download CV' });
          }
        }
      });
      return;
    }

    const filePath = path.join(uploadDir, latestCV.filename);
    console.log('Checking file path:', filePath);
    
    if (!fs.existsSync(filePath)) {
      console.log('CV file not found on server at path:', filePath);
      return res.status(404).json({ message: 'CV file not found on server' });
    }

    console.log('Sending file:', latestCV.filename);
    res.download(filePath, 'Avijit_Dam_CV.pdf', (err) => {
      if (err) {
        console.error('Error downloading file:', err);
        if (!res.headersSent) {
          res.status(500).json({ error: 'Failed to download CV' });
        }
      }
    });
  } catch (error) {
    console.error('Error in /latest:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to download CV', details: error.message });
    }
  }
});

// Upload new CV
router.post('/upload', upload.single('cv'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    // Create new CV document
    const newCV = new CV({
      title: req.body.title || 'Latest CV',
      filename: req.file.filename,
      fileType: req.file.mimetype,
      isActive: true // Make the new CV active by default
    });

    // Deactivate all other CVs
    await CV.updateMany({}, { isActive: false });
    await newCV.save();

    res.status(201).json({
      message: 'CV uploaded successfully',
      cv: {
        id: newCV._id,
        title: newCV.title,
        uploadDate: newCV.uploadDate,
        isActive: newCV.isActive,
        filename: newCV.filename
      }
    });
  } catch (error) {
    console.error('Error in /upload:', error);
    // Clean up uploaded file if database operation fails
    if (req.file && req.file.path) {
      fs.unlinkSync(req.file.path);
    }
    res.status(500).json({ error: 'Failed to upload CV' });
  }
});

// Toggle CV active status
router.patch('/:id/toggle-active', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid CV ID' });
    }

    // If we're activating this CV, deactivate all others first
    const cv = await CV.findById(req.params.id);
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    const newActiveState = !cv.isActive;
    
    if (newActiveState) {
      await CV.updateMany(
        { _id: { $ne: cv._id } },
        { $set: { isActive: false } }
      );
    }

    // Use findOneAndUpdate to update the CV
    const updatedCV = await CV.findOneAndUpdate(
      { _id: cv._id },
      { $set: { isActive: newActiveState } },
      { new: true }
    );

    res.json({
      message: `CV ${updatedCV.isActive ? 'activated' : 'deactivated'} successfully`,
      cv: {
        id: updatedCV._id,
        title: updatedCV.title,
        uploadDate: updatedCV.uploadDate,
        isActive: updatedCV.isActive,
        filename: updatedCV.filename
      }
    });
  } catch (error) {
    console.error('Error in /toggle-active:', error);
    res.status(500).json({ error: 'Failed to update CV status' });
  }
});

// Delete CV
router.delete('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid CV ID' });
    }

    const cv = await CV.findById(req.params.id);
    if (!cv) {
      return res.status(404).json({ error: 'CV not found' });
    }

    // Delete file from uploads directory
    if (cv.filename) {
      const filePath = path.join(uploadDir, cv.filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await cv.deleteOne();
    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.error('Error in /delete:', error);
    res.status(500).json({ error: 'Failed to delete CV' });
  }
});

module.exports = router;

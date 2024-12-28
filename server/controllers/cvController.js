const mongoose = require('mongoose');
const { CV } = require('../models/CV');
const multer = require('multer');
const { GridFSBucket } = require('mongodb');

// Initialize GridFS
let gfs;
mongoose.connection.once('open', () => {
  gfs = new GridFSBucket(mongoose.connection.db, {
    bucketName: 'cvs'
  });
});

// Configure multer for file upload
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed!'), false);
    }
  }
}).single('cv');

const uploadCV = async (req, res) => {
  upload(req, res, async (err) => {
    try {
      if (err) {
        return res.status(400).json({ message: err.message });
      }

      if (!req.file) {
        return res.status(400).json({ message: 'Please upload a file' });
      }

      // Create a unique filename
      const filename = `cv_${Date.now()}_${req.file.originalname}`;

      // Upload file to GridFS
      const uploadStream = gfs.openUploadStream(filename, {
        contentType: req.file.mimetype
      });

      uploadStream.end(req.file.buffer);

      // Create CV document
      const cv = new CV({
        filename: filename,
        fileId: uploadStream.id,
        contentType: req.file.mimetype,
        size: req.file.size
      });

      // Save CV document
      await cv.save();

      res.status(201).json({
        message: 'CV uploaded successfully',
        cv: {
          id: cv._id,
          filename: cv.filename,
          uploadDate: cv.uploadDate
        }
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({ message: error.message });
    }
  });
};

const getLatestCV = async (req, res) => {
  try {
    // Set CORS headers
    res.set({
      'Access-Control-Allow-Origin': req.headers.origin || '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      'Access-Control-Allow-Credentials': 'true',
      'Access-Control-Expose-Headers': 'Content-Disposition'
    });

    // Handle preflight request
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }

    const cv = await CV.findOne({ isActive: true }).sort({ uploadDate: -1 });
    if (!cv) {
      return res.status(404).json({ message: 'No active CV found' });
    }

    const downloadStream = gfs.openDownloadStream(cv.fileId);

    res.set({
      'Content-Type': cv.contentType,
      'Content-Disposition': `attachment; filename="${cv.filename}"`,
      'Content-Length': cv.size
    });

    downloadStream.pipe(res);
  } catch (error) {
    console.error('Download error:', error);
    res.status(500).json({ message: error.message });
  }
};

const listCVs = async (req, res) => {
  try {
    const cvs = await CV.find().sort({ uploadDate: -1 });
    res.json(cvs);
  } catch (error) {
    console.error('List error:', error);
    res.status(500).json({ message: error.message });
  }
};

const toggleActive = async (req, res) => {
  try {
    const { id } = req.params;

    // First, set all CVs to inactive
    await CV.updateMany({}, { isActive: false });

    // Then set the selected CV to active
    const cv = await CV.findByIdAndUpdate(
      id,
      { isActive: true },
      { new: true }
    );

    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    res.json(cv);
  } catch (error) {
    console.error('Toggle error:', error);
    res.status(500).json({ message: error.message });
  }
};

const deleteCV = async (req, res) => {
  try {
    const { id } = req.params;
    const cv = await CV.findById(id);

    if (!cv) {
      return res.status(404).json({ message: 'CV not found' });
    }

    // Delete file from GridFS
    await gfs.delete(cv.fileId);

    // Delete CV document
    await CV.findByIdAndDelete(id);

    res.json({ message: 'CV deleted successfully' });
  } catch (error) {
    console.error('Delete error:', error);
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  uploadCV,
  getLatestCV,
  listCVs,
  toggleActive,
  deleteCV
};

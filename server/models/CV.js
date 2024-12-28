const mongoose = require('mongoose');
const { GridFSBucket } = require('mongodb');

const cvSchema = new mongoose.Schema({
  filename: {
    type: String,
    required: true
  },
  fileId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: false
  },
  contentType: {
    type: String,
    required: true
  },
  size: {
    type: Number,
    required: true
  }
});

const CV = mongoose.model('CV', cvSchema);

module.exports = { CV };

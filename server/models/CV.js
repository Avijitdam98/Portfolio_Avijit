const mongoose = require('mongoose');

const CVSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Latest CV'
  },
  filename: {
    type: String,
    required: function() {
      // Only required for new documents or when explicitly updating the filename
      return this.isNew || this.isModified('filename');
    }
  },
  fileContent: {
    type: String, // For storing base64 content
    required: function() {
      return !this.filename || this.filename.includes('base64');
    }
  },
  fileType: {
    type: String,
    required: function() {
      // Only required for new documents or when explicitly updating the fileType
      return this.isNew || this.isModified('fileType');
    }
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: false
  }
});

// Add middleware to handle isActive updates
CVSchema.pre('findOneAndUpdate', function(next) {
  // If we're only updating isActive, skip other validations
  if (this._update && this._update.$set && Object.keys(this._update.$set).length === 1 && 'isActive' in this._update.$set) {
    this.setOptions({ runValidators: false });
  }
  next();
});

// Add method to get file data
CVSchema.methods.getFileData = function() {
  if (this.fileContent) {
    return Buffer.from(this.fileContent.replace(/^data:application\/pdf;base64,/, ''), 'base64');
  }
  return null;
};

module.exports = mongoose.model('CV', CVSchema);

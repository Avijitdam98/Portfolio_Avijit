const mongoose = require('mongoose');

const cvVersionSchema = new mongoose.Schema({
  version: {
    type: String,
    required: true
  },
  filename: {
    type: String,
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
  fileSize: Number,
  mimeType: String,
  category: {
    type: String,
    enum: ['professional', 'academic', 'creative'],
    default: 'professional'
  },
  metadata: {
    title: String,
    description: String,
    tags: [String]
  }
});

// Ensure only one active version
cvVersionSchema.pre('save', async function(next) {
  if (this.isActive) {
    await this.constructor.updateMany(
      { _id: { $ne: this._id } },
      { $set: { isActive: false } }
    );
  }
  next();
});

module.exports = mongoose.model('CVVersion', cvVersionSchema);

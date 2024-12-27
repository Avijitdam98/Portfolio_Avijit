require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const CV = require('../models/CV');

// Create a test PDF file
function createTestPDF() {
  const testDir = path.join(__dirname, '../uploads/cv');
  if (!fs.existsSync(testDir)) {
    fs.mkdirSync(testDir, { recursive: true });
  }
  
  const testFile = path.join(testDir, 'test-cv.pdf');
  // Create a simple PDF-like file (not a real PDF, just for testing)
  fs.writeFileSync(testFile, '%PDF-1.4\nThis is a test PDF file\n%%EOF');
  return testFile;
}

async function uploadTestCV() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create test PDF
    const testFile = createTestPDF();
    const filename = path.basename(testFile);
    
    // Create new CV document
    const newCV = new CV({
      title: 'Test CV',
      filename: filename,
      fileType: 'application/pdf',
      isActive: true
    });

    // Deactivate all other CVs
    await CV.updateMany({}, { isActive: false });
    await newCV.save();

    console.log('Test CV uploaded successfully:', {
      id: newCV._id,
      title: newCV.title,
      filename: newCV.filename,
      isActive: newCV.isActive
    });

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

uploadTestCV();

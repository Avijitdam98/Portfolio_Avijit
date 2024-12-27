require('dotenv').config();
const mongoose = require('mongoose');
const path = require('path');
const fs = require('fs');
const CV = require('../models/CV');

async function checkCV() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const cvs = await CV.find({});
    console.log('\nFound CVs:', cvs.length);

    for (const cv of cvs) {
      console.log('\nCV Details:');
      console.log('ID:', cv._id);
      console.log('Title:', cv.title);
      console.log('Filename:', cv.filename);
      console.log('Is Active:', cv.isActive);
      
      const filePath = path.join(__dirname, '../uploads/cv', cv.filename);
      console.log('File path:', filePath);
      console.log('File exists:', fs.existsSync(filePath));
    }

    const activeCV = await CV.findOne({ isActive: true });
    console.log('\nActive CV:', activeCV ? activeCV.title : 'None');

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoose.disconnect();
  }
}

checkCV();

const https = require('https');
const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const images = [
  {
    url: 'https://raw.githubusercontent.com/Avijitdam98/fullstackchatapp/main/screenshot.png',
    filename: 'chat-app.webp'
  },
  {
    url: 'https://raw.githubusercontent.com/Avijitdam98/food_app/main/screenshot.png',
    filename: 'food-app.webp'
  },
  {
    url: 'https://raw.githubusercontent.com/Avijitdam98/ecommerce_site_clone/main/screenshot.png',
    filename: 'ecommerce.webp'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const tempPath = path.join(__dirname, '..', 'public', 'images', 'projects', 'temp_' + path.basename(filename, '.webp') + '.png');
    const finalPath = path.join(__dirname, '..', 'public', 'images', 'projects', filename);

    https.get(url, (response) => {
      if (response.statusCode !== 200) {
        reject(new Error(`Failed to download image: ${response.statusCode}`));
        return;
      }

      const fileStream = fs.createWriteStream(tempPath);
      response.pipe(fileStream);

      fileStream.on('finish', () => {
        fileStream.close();
        
        // Convert to WebP
        try {
          execSync(`cwebp -q 80 "${tempPath}" -o "${finalPath}"`);
          fs.unlinkSync(tempPath); // Clean up temporary file
          console.log(`Successfully converted ${filename}`);
          resolve();
        } catch (error) {
          console.error(`Failed to convert ${filename} to WebP:`, error);
          // Fallback to PNG if WebP conversion fails
          fs.copyFileSync(tempPath, finalPath.replace('.webp', '.png'));
          fs.unlinkSync(tempPath);
          resolve();
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

// Create directories if they don't exist
const dirs = [
  path.join(__dirname, '..', 'public'),
  path.join(__dirname, '..', 'public', 'images'),
  path.join(__dirname, '..', 'public', 'images', 'projects')
];

dirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Download and process all images
Promise.all(images.map(img => downloadImage(img.url, img.filename)))
  .then(() => console.log('All images processed successfully'))
  .catch(error => console.error('Error processing images:', error));

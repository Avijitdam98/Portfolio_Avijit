const sharp = require('sharp');
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

const sizes = [
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 512, name: 'android-chrome-512x512.png' }
];

async function generateFavicons() {
  const publicDir = path.join(__dirname, '..', 'public');
  const svgPath = path.join(publicDir, 'favicon.svg');
  const tempPng = path.join(publicDir, 'temp.png');

  // Convert SVG to high-res PNG first
  execSync(`npx svgexport ${svgPath} ${tempPng} 1024:1024`);

  // Generate different sizes
  for (const { size, name } of sizes) {
    await sharp(tempPng)
      .resize(size, size)
      .png()
      .toFile(path.join(publicDir, name));
  }

  // Clean up temp file
  fs.unlinkSync(tempPng);
}

generateFavicons().catch(console.error);

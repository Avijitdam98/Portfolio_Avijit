const puppeteer = require('puppeteer');
const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const projects = [
  {
    url: 'https://project-managment-tool-one.vercel.app/login',
    filename: 'project-management.webp',
    waitForSelector: '.login-form', // Wait for login form to be visible
    beforeScreenshot: async (page) => {
      // Add any custom styling or interactions needed before screenshot
      await page.addStyleTag({
        content: `
          body { background: linear-gradient(135deg, #2563EB, #4F46E5, #7C3AED) !important; }
        `
      });
    }
  },
  {
    url: 'https://invoice-genrator-rosy.vercel.app',
    filename: 'invoice-generator.webp',
    waitForSelector: '#invoice-form', // Wait for invoice form to be visible
    beforeScreenshot: async (page) => {
      await page.addStyleTag({
        content: `
          body { background: linear-gradient(135deg, #0EA5E9, #06B6D4, #0891B2) !important; }
        `
      });
    }
  },
  {
    url: 'https://fullstackchatapp-29xc.onrender.com',
    filename: 'chat-app.webp',
    waitForSelector: '.chat-container',
    beforeScreenshot: async (page) => {
      await page.addStyleTag({
        content: `
          body { background: linear-gradient(135deg, #3B82F6, #4F46E5, #7C3AED) !important; }
        `
      });
    }
  },
  {
    url: 'https://food-app-navy.vercel.app',
    filename: 'food-app.webp',
    waitForSelector: '.recipe-grid',
    beforeScreenshot: async (page) => {
      await page.addStyleTag({
        content: `
          body { background: linear-gradient(135deg, #10B981, #14B8A6, #0891B2) !important; }
        `
      });
    }
  },
  {
    url: 'https://ecommerce-site-clone.pages.dev',
    filename: 'ecommerce.webp',
    waitForSelector: '.product-grid',
    beforeScreenshot: async (page) => {
      await page.addStyleTag({
        content: `
          body { background: linear-gradient(135deg, #F43F5E, #EC4899, #7C3AED) !important; }
        `
      });
    }
  }
];

async function captureScreenshot(url, filename, options = {}) {
  const browser = await puppeteer.launch({
    headless: 'new',
    defaultViewport: {
      width: 1200,
      height: 630,
      deviceScaleFactor: 2
    }
  });

  try {
    const page = await browser.newPage();
    
    // Add custom styles for better screenshots
    await page.addStyleTag({
      content: `
        * {
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }
      `
    });

    // Wait for network idle to ensure content is loaded
    await page.goto(url, { waitUntil: 'networkidle0', timeout: 60000 });
    
    // Wait for specific selector if provided
    if (options.waitForSelector) {
      try {
        await page.waitForSelector(options.waitForSelector, { timeout: 5000 });
      } catch (error) {
        console.warn(`Selector ${options.waitForSelector} not found for ${url}`);
      }
    }

    // Execute any custom actions before screenshot
    if (options.beforeScreenshot) {
      await options.beforeScreenshot(page);
    }

    // Wait an additional second for any animations
    await page.waitForTimeout(1000);

    const screenshotBuffer = await page.screenshot({
      type: 'jpeg',
      quality: 90
    });

    // Process the image with sharp
    await sharp(screenshotBuffer)
      .resize(1200, 630, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: 85 })
      .toFile(path.join(__dirname, '..', 'public', 'images', 'projects', filename));

    console.log(`Successfully captured screenshot for ${url}`);
  } catch (error) {
    console.error(`Error capturing screenshot for ${url}:`, error);
  } finally {
    await browser.close();
  }
}

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

// Capture all screenshots
async function captureAll() {
  for (const project of projects) {
    await captureScreenshot(project.url, project.filename, {
      waitForSelector: project.waitForSelector,
      beforeScreenshot: project.beforeScreenshot
    });
  }
}

captureAll().then(() => {
  console.log('All screenshots captured successfully');
}).catch(error => {
  console.error('Error capturing screenshots:', error);
});

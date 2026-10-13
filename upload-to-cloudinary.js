const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
// You need to set these environment variables:
// CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || 'dpswydgko',
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// List of images to upload
const images = [
  'art-tale.jpg',
  'charchter-adventure.jpg',
  'creative-studio.jpg',
  'dinasour-tale.jpg',
  'fairy-tale.jpg',
  'fossil-hunt.jpg',
  'game-tale.jpg',
  'Gemini_Generated_Image_jplq77jplq77jplq.png',
  'kids-cupcake.jpg',
  'magic-and-interactive-fun.jpg',
  'mini-racing.jpg',
  'mystery-challenge.jpg',
  'racecar-tale.jpg',
  'safari-tale.jpg',
  'science-tale.jpg',
  'slime-bar.jpg',
  'space-tale.jpg',
  'theme1.jpg',
  'theme2.jpg',
  'treasure-hunt.jpg',
];

async function uploadImages() {
  console.log('Starting upload to Cloudinary...\n');
  
  for (const image of images) {
    const filePath = path.join(__dirname, 'public', image);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${image}`);
      continue;
    }
    
    try {
      console.log(`Uploading ${image}...`);
      const result = await cloudinary.uploader.upload(filePath, {
        folder: 'thehappytale',
        public_id: image.replace(/\.[^/.]+$/, ''), // Remove extension
        overwrite: true,
        resource_type: 'auto',
      });
      console.log(`✅ Uploaded: ${image} -> ${result.secure_url}\n`);
    } catch (error) {
      console.error(`❌ Failed to upload ${image}:`, error.message);
    }
  }
  
  console.log('\n✅ Upload complete!');
}

uploadImages().catch(console.error);

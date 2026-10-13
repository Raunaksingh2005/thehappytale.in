const fs = require('fs');
const path = require('path');
const https = require('https');

// Your Cloudinary cloud name
const CLOUD_NAME = 'dpswydgko';

// IMPORTANT: Get your upload preset from Cloudinary dashboard:
// 1. Go to Settings → Upload
// 2. Scroll to "Upload presets"
// 3. Either use "ml_default" or create a new unsigned preset
const UPLOAD_PRESET = 'ml_default'; // Change this if needed

const images = [
  'art-tale.jpg',
  'charchter-adventure.jpg',
  'creative-studio.jpg',
  'dinasour-tale.jpg',
  'fairy-tale.jpg',
  'fossil-hunt.jpg',
  'game-tale.jpg',
  'Gemini_Generated_Image_jplq77jplq77jplq.jpg',
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

async function uploadToCloudinary(filePath, filename) {
  return new Promise((resolve, reject) => {
    const FormData = require('form-data');
    const form = new FormData();
    
    form.append('file', fs.createReadStream(filePath));
    form.append('upload_preset', UPLOAD_PRESET);
    form.append('folder', 'thehappytale');
    form.append('public_id', filename.replace(/\.[^/.]+$/, ''));
    
    const req = https.request({
      hostname: 'api.cloudinary.com',
      path: `/v1_1/${CLOUD_NAME}/image/upload`,
      method: 'POST',
      headers: form.getHeaders(),
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        if (res.statusCode === 200) {
          const result = JSON.parse(data);
          resolve(result);
        } else {
          reject(new Error(`Upload failed: ${res.statusCode} - ${data}`));
        }
      });
    });
    
    req.on('error', reject);
    form.pipe(req);
  });
}

async function uploadAll() {
  console.log('🚀 Starting Cloudinary upload...\n');
  
  // Check if form-data is installed
  try {
    require('form-data');
  } catch (e) {
    console.log('❌ Installing form-data...');
    require('child_process').execSync('npm install form-data', { stdio: 'inherit' });
  }
  
  for (const image of images) {
    const filePath = path.join(__dirname, 'public', image);
    
    if (!fs.existsSync(filePath)) {
      console.log(`❌ File not found: ${image}`);
      continue;
    }
    
    try {
      console.log(`📤 Uploading ${image}...`);
      const result = await uploadToCloudinary(filePath, image);
      console.log(`✅ ${image} → ${result.secure_url}\n`);
    } catch (error) {
      console.error(`❌ Failed to upload ${image}:`, error.message);
      console.log('\n⚠️  If you see "Upload preset not found", you need to:');
      console.log('   1. Go to https://cloudinary.com/console');
      console.log('   2. Settings → Upload → Upload presets');
      console.log('   3. Enable "Unsigned uploading" or create a preset\n');
    }
  }
  
  console.log('\n✅ Upload complete!');
}

uploadAll().catch(console.error);

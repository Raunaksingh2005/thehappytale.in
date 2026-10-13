const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const outputDir = path.join(__dirname, 'public-optimized');

// Create output directory if it doesn't exist
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Images to optimize
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

async function optimizeImage(filename) {
  const inputPath = path.join(publicDir, filename);
  const ext = path.extname(filename).toLowerCase();
  const basename = path.basename(filename, ext);
  const outputPath = path.join(outputDir, `${basename}.jpg`); // Convert all to JPG
  
  if (!fs.existsSync(inputPath)) {
    console.log(`❌ File not found: ${filename}`);
    return;
  }
  
  try {
    const stats = fs.statSync(inputPath);
    const originalSize = (stats.size / 1024).toFixed(2);
    
    await sharp(inputPath)
      .resize(1200, 1200, { // Max 1200px width/height
        fit: 'inside',
        withoutEnlargement: true,
      })
      .jpeg({
        quality: 80,
        progressive: true,
        mozjpeg: true,
      })
      .toFile(outputPath);
    
    const newStats = fs.statSync(outputPath);
    const newSize = (newStats.size / 1024).toFixed(2);
    const savings = ((1 - newStats.size / stats.size) * 100).toFixed(1);
    
    console.log(`✅ ${filename}`);
    console.log(`   ${originalSize}KB → ${newSize}KB (${savings}% smaller)\n`);
  } catch (error) {
    console.error(`❌ Failed to optimize ${filename}:`, error.message);
  }
}

async function optimizeAll() {
  console.log('🖼️  Starting image optimization...\n');
  
  for (const image of images) {
    await optimizeImage(image);
  }
  
  console.log('\n✅ Optimization complete!');
  console.log(`\nOptimized images saved to: ${outputDir}`);
  console.log('\nTo use them, run:');
  console.log('  rm -rf public/*.jpg public/*.png');
  console.log('  mv public-optimized/* public/');
  console.log('  rm -rf public-optimized');
}

optimizeAll().catch(console.error);

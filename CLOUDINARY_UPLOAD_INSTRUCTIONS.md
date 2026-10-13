# Upload Images to Cloudinary

## Option 1: Manual Upload (Easiest)

1. Go to https://cloudinary.com/console
2. Login to your account (cloud name: `dpswydgko`)
3. Click "Media Library" in the left sidebar
4. Create/select folder: `thehappytale`
5. Click "Upload" button
6. Select and upload all these images from the `public/` folder:

### Images to Upload:
- art-tale.jpg
- charchter-adventure.jpg
- creative-studio.jpg
- dinasour-tale.jpg
- fairy-tale.jpg
- fossil-hunt.jpg
- game-tale.jpg
- Gemini_Generated_Image_jplq77jplq77jplq.png
- kids-cupcake.jpg
- magic-and-interactive-fun.jpg
- mini-racing.jpg
- mystery-challenge.jpg
- racecar-tale.jpg
- safari-tale.jpg
- science-tale.jpg
- slime-bar.jpg
- space-tale.jpg
- theme1.jpg
- theme2.jpg
- treasure-hunt.jpg

## Option 2: Using Upload Script

1. Get your Cloudinary credentials from https://cloudinary.com/console
2. Update `.env.local` with your API Key and API Secret
3. Run: `node upload-to-cloudinary.js`

## After Upload

Test a URL to verify:
https://res.cloudinary.com/dpswydgko/image/upload/f_auto,q_auto/thehappytale/dinasour-tale.jpg

If images load, you're all set! ✅

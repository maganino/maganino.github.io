/**
 * Image Processing Script
 * Removes dark backgrounds from drawings and creates transparent PNGs
 * Also creates inverted versions for light mode
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';

const DRAWINGS_DIR = './public/images/drawings';
const TRANSPARENT_DIR = path.join(DRAWINGS_DIR, 'transparent');
const INVERTED_DIR = path.join(DRAWINGS_DIR, 'inverted');

async function processImage(filename) {
  const inputPath = path.join(DRAWINGS_DIR, filename);
  const outputPath = path.join(TRANSPARENT_DIR, filename);
  const invertedPath = path.join(INVERTED_DIR, filename);
  
  try {
    // Read the image
    const image = sharp(inputPath);
    
    // Remove near-black background from macOS Notes screenshots in a smooth way:
    // - very dark pixels become fully transparent
    // - bright stroke pixels stay fully opaque
    // - only mid-tones near the edge of strokes become semi-transparent
    await image
      .ensureAlpha()
      .raw()
      .toBuffer({ resolveWithObject: true })
      .then(({ data, info }) => {
        const bgThreshold = 40;  // <= this = pure background
        const fgThreshold = 130; // >= this = solid stroke

        // Process each pixel
        for (let i = 0; i < data.length; i += 4) {
          const r = data[i];
          const g = data[i + 1];
          const b = data[i + 2];
          const a = data[i + 3];

          const brightness = (r + g + b) / 3; // 0..255

          if (brightness <= bgThreshold) {
            // Definitely background → fully transparent
            data[i + 3] = 0;
          } else if (brightness >= fgThreshold) {
            // Definitely foreground (stroke interior) → fully opaque
            data[i + 3] = 255;
          } else {
            // Mid-tones near stroke edges → scale alpha smoothly 0..255
            const alphaFactor = (brightness - bgThreshold) / (fgThreshold - bgThreshold); // 0..1
            const newAlpha = Math.max(a, Math.round(alphaFactor * 255));
            data[i + 3] = newAlpha;
          }
          // Keep original RGB so white / colored strokes stay intact
        }

        const rawOptions = {
          width: info.width,
          height: info.height,
          channels: 4
        };

        // First, write the transparent version
        const transparentData = Buffer.from(data);

        return sharp(transparentData, { raw: rawOptions })
          .png()
          .toFile(outputPath)
          .then(() => {
            // Now create the "negative" version where white pixels become black
            const invertedData = Buffer.from(transparentData);

            for (let i = 0; i < invertedData.length; i += 4) {
              const r = invertedData[i];
              const g = invertedData[i + 1];
              const b = invertedData[i + 2];

              // If pixel is (near) white, turn it black (keep alpha as-is)
              if (r > 200 && g > 200 && b > 200) {
                invertedData[i] = 0;     // R
                invertedData[i + 1] = 0; // G
                invertedData[i + 2] = 0; // B
              }
            }

            return sharp(invertedData, { raw: rawOptions })
              .png()
              .toFile(invertedPath);
          });
      });
    
    console.log(`✓ Processed: ${filename}`);
    
  } catch (error) {
    console.error(`✗ Error processing ${filename}:`, error.message);
  }
}

async function main() {
  // Create output subdirectories
  if (!fs.existsSync(TRANSPARENT_DIR)) {
    fs.mkdirSync(TRANSPARENT_DIR, { recursive: true });
  }

  if (!fs.existsSync(INVERTED_DIR)) {
    fs.mkdirSync(INVERTED_DIR, { recursive: true });
  }

  console.log('Scanning drawings folder for images...\n');

  const allEntries = fs.readdirSync(DRAWINGS_DIR);
  const imageFiles = allEntries.filter((entry) => {
    const fullPath = path.join(DRAWINGS_DIR, entry);
    const isFile = fs.statSync(fullPath).isFile();
    const isImage = /\.(png|jpe?g|gif)$/i.test(entry);
    return isFile && isImage;
  });

  if (imageFiles.length === 0) {
    console.log('No images found in public/images/drawings/');
    return;
  }

  console.log(`Processing ${imageFiles.length} image(s)...\n`);

  for (const filename of imageFiles) {
    await processImage(filename);
  }
  
  console.log('\nDone! Transparent images are in public/images/drawings/transparent/ and inverted images are in public/images/drawings/inverted/');
}

main();
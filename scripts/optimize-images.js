import sharp from 'sharp';
import { readdir, access } from 'fs/promises';
import { constants } from 'fs';

const MAX_WIDTH = 2048; // max-w-5xl (1024px) * 2 for retina

async function optimizeImages() {
  const files = await readdir('.');
  const yippeeFiles = files.filter(f => f.match(/^yippee\d+\.png$/));

  console.log(`Found ${yippeeFiles.length} images to optimize...`);

  let optimized = 0;
  let skipped = 0;

  for (const file of yippeeFiles) {
    const outputFile = file.replace('.png', '-optimized.webp');

    try {
      await access(outputFile, constants.F_OK);
      console.log(`⊘ ${file} (already optimized)`);
      skipped++;
      continue;
    } catch {
      // File doesn't exist, proceed with optimization
    }

    await sharp(file)
      .resize(MAX_WIDTH, null, {
        withoutEnlargement: true,
        fit: 'inside'
      })
      .webp({ quality: 90 })
      .toFile(outputFile);

    console.log(`✓ ${file} → ${outputFile}`);
    optimized++;
  }

  console.log(`\nOptimization complete! (${optimized} optimized, ${skipped} skipped)`);
}

optimizeImages().catch(console.error);

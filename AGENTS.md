# Agent Workflows

## Adding & Optimizing Images

When adding new yippee images to the site:

### 1. Add the image
Place the new image in the root directory with the naming pattern `yippeeX.png` (where X is the next number).

### 2. Optimize the image
Run the optimization script:
```bash
npm run optimize
```

This will:
- Resize to 2048px width (max-w-5xl × 2 for retina displays)
- Convert to WebP format at 90% quality
- Output as `yippeeX-optimized.webp`
- Skip already-optimized images

### 3. Update index.html
Add the image tag to `index.html`:
```html
<img src="./yippeeX-optimized.webp" alt="">
```

### Notes
- The optimize script is located at `scripts/optimize-images.js`
- Images are constrained to `max-w-5xl` (1024px) in Tailwind
- Optimized images are 2048px wide for retina display support

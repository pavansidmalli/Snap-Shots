/**
 * Utility to automatically trim excessive empty/black/transparent borders from uploaded logos
 * so the actual brand mark appears large and prominent in headers and footers.
 */
export function trimImagePadding(imgSrc: string): Promise<string> {
  return new Promise((resolve) => {
    // If SVG or empty, return as-is (SVGs are vector-scaled and do not require raster canvas trimming)
    if (!imgSrc || imgSrc.startsWith('data:image/svg+xml') || imgSrc.includes('.svg')) {
      return resolve(imgSrc);
    }

    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.onload = () => {
      try {
        const canvas = document.createElement('canvas');
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext('2d', { willReadFrequently: true });
        if (!ctx) return resolve(imgSrc);

        ctx.drawImage(img, 0, 0);
        const { data, width, height } = ctx.getImageData(0, 0, canvas.width, canvas.height);

        let minX = width;
        let minY = height;
        let maxX = 0;
        let maxY = 0;
        let found = false;

        // Scan pixels for non-background content
        for (let y = 0; y < height; y++) {
          for (let x = 0; x < width; x++) {
            const idx = (y * width + x) * 4;
            const r = data[idx];
            const g = data[idx + 1];
            const b = data[idx + 2];
            const a = data[idx + 3];

            // If not transparent and not near-black border (threshold for black background profile avatars)
            if (a > 30 && (r > 26 || g > 26 || b > 26)) {
              if (x < minX) minX = x;
              if (x > maxX) maxX = x;
              if (y < minY) minY = y;
              if (y > maxY) maxY = y;
              found = true;
            }
          }
        }

        // If content is centered with large vertical or horizontal margins (>12% padding)
        if (found && (minY > height * 0.1 || maxY < height * 0.9 || minX > width * 0.1 || maxX < width * 0.9)) {
          const padY = Math.floor(height * 0.025);
          const padX = Math.floor(width * 0.025);
          const cropX = Math.max(0, minX - padX);
          const cropY = Math.max(0, minY - padY);
          const cropW = Math.min(width - cropX, maxX - minX + padX * 2);
          const cropH = Math.min(height - cropY, maxY - minY + padY * 2);

          if (cropW > 10 && cropH > 10) {
            const cropCanvas = document.createElement('canvas');
            cropCanvas.width = cropW;
            cropCanvas.height = cropH;
            const cropCtx = cropCanvas.getContext('2d');
            if (cropCtx) {
              cropCtx.drawImage(canvas, cropX, cropY, cropW, cropH, 0, 0, cropW, cropH);
              return resolve(cropCanvas.toDataURL('image/png'));
            }
          }
        }
      } catch (err) {
        console.warn('Auto-trimming logo failed:', err);
      }
      resolve(imgSrc);
    };

    img.onerror = () => resolve(imgSrc);
    img.src = imgSrc;
  });
}

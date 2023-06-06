import type { WatermarkSettings } from '$lib/types';

export async function applyWatermark(imageBlob: Blob, watermarkBlob: Blob, settings: WatermarkSettings): Promise<Blob> {
    const loadImage = (blob: Blob) => {
        const image = new Image();
        image.src = URL.createObjectURL(blob);
        return new Promise((res) => ((image.onload = res), (image.onerror = res))).then(() => image);
    };


    const [image, watermark] = await Promise.all([loadImage(imageBlob), loadImage(watermarkBlob)]);

    // Calculate scaling factor
    const maxWatermarkPixels = Math.max(watermark.width, watermark.height);
    const minImagePixels = Math.min(image.width, image.height);
    const scaleFactor = (settings.scale / 100) * (minImagePixels / maxWatermarkPixels);

    // Calculate new watermark dimensions
    const watermarkWidthScaled = watermark.width * scaleFactor;
    const watermarkHeightScaled = watermark.height * scaleFactor;

    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);

    const positionCalculator = {
        'topleft': () => ({ x: 0, y: 0 }),
        'topcenter': () => ({ x: (image.width / 2) - (watermarkWidthScaled / 2), y: 0 }),
        'topright': () => ({ x: image.width - watermarkWidthScaled, y: 0 }),
        'left': () => ({ x: 0, y: (image.height / 2) - (watermarkHeightScaled / 2) }),
        'center': () => ({ x: (image.width / 2) - (watermarkWidthScaled / 2), y: (image.height / 2) - (watermarkHeightScaled / 2) }),
        'right': () => ({ x: image.width - watermarkWidthScaled, y: (image.height / 2) - (watermarkHeightScaled / 2) }),
        'bottomleft': () => ({ x: 0, y: image.height - watermarkHeightScaled }),
        'bottomcenter': () => ({ x: (image.width / 2) - (watermarkWidthScaled / 2), y: image.height - watermarkHeightScaled }),
        'bottomright': () => ({ x: image.width - watermarkWidthScaled, y: image.height - watermarkHeightScaled })
    };

    const { x: watermarkX, y: watermarkY } = positionCalculator[settings.watermarkPosition]();

    // Apply watermark scale and opacity settings
    ctx.globalAlpha = settings.opacity / 100;
    ctx.drawImage(watermark, watermarkX, watermarkY, watermarkWidthScaled, watermarkHeightScaled);
    ctx.globalAlpha = 1.0; // Reset opacity

    // Convert the canvas back to a Blob.
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
}

import type { WatermarkSettings } from '$lib/types';

export async function applyWatermark(imageBlob: Blob, watermarkBlob: Blob, settings: WatermarkSettings): Promise<Blob> {
    const loadImage = (blob: Blob) => {
        const image = new Image();
        image.src = URL.createObjectURL(blob);
        return new Promise((res) => ((image.onload = res), (image.onerror = res))).then(() => image);
    };

    // Load the images.
    const [image, watermark] = await Promise.all([loadImage(imageBlob), loadImage(watermarkBlob)]);

    // Create a canvas and draw the image and watermark on it.
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = image.width;
    canvas.height = image.height;
    ctx.drawImage(image, 0, 0);
    let watermarkX;
    switch (settings.watermarkPosition) {
        case 'left':
            watermarkX = 0;
            break;
        case 'right':
            watermarkX = image.width - watermark.width;
            break;
        default: // center
            watermarkX = (image.width - watermark.width) / 2;
            break;
    }
    ctx.drawImage(watermark, watermarkX, (image.height - watermark.height) / 2);

    // Convert the canvas back to a Blob.
    return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
}

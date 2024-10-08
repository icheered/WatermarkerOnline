import { applyWatermark } from '$lib/imageManipulator';
import type { WatermarkSettings } from '$lib/types';
import { writable } from 'svelte/store';

export const processedFiles = writable([]);
export const cancelSignal = writable(false);


export async function writeFiles(files: File[], watermarkFile: File | null, settings: WatermarkSettings, dirHandle: FileSystemDirectoryHandle | null) {
    if (!dirHandle || !watermarkFile) {
        console.log('No directory or watermark selected');
        return;
    }

    // Check if 'WATERMARKED' directory exists
    try {
        const existingDirectory = await dirHandle.getDirectoryHandle('WATERMARKED', { create: false });
        // If the directory exists, delete it
        await dirHandle.removeEntry('WATERMARKED');
    } catch (e) {
        // If getDirectoryHandle throws, the directory does not exist, do nothing
    }

    const newDirectoryHandle = await dirHandle.getDirectoryHandle('WATERMARKED', { create: true });

    let cancel = false;
    const cancelSubscription = cancelSignal.subscribe(value => {
        cancel = value;
    });

    for (let i = 0; i < files.length; i++) {
        if (cancel) {
            console.log('Operation canceled');
            break;
        }

        const file = files[i];
        const newFileHandle = await newDirectoryHandle.getFileHandle(file.name, {
            create: true
        });
        const writable = await newFileHandle.createWritable();

        const watermarkedImage = await applyWatermark(file, watermarkFile, settings);
        await watermarkedImage.stream().pipeTo(writable);

        processedFiles.update(value => [...value, file.name]);
    }
    cancelSubscription();
}

export async function generatePreview(files: File[], watermarkFile: File | null, settings: WatermarkSettings) {
    if (!files.length || !watermarkFile) {
        return;
    }

    const previewImage = await applyWatermark(files[0], watermarkFile, settings);
    return URL.createObjectURL(previewImage);
}

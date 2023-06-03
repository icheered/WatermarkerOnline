import { applyWatermark } from '$lib/imageManipulator';
import type { WatermarkSettings } from '$lib/types';


export async function selectWatermark() {
    const [fileHandle] = await window.showOpenFilePicker();
    return await fileHandle.getFile();
}

export async function selectDirectory(dirHandle: FileSystemDirectoryHandle | null) {
    dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
    const promises = [];
    for await (const entry of dirHandle.values()) {
        if (entry.kind !== 'file') {
            continue;
        }
        promises.push(entry.getFile());
    }
    const files = await Promise.all(promises);

    console.log('Files:', files);
    return { dirHandle, files }
}

export async function writeFiles(files: File[], watermarkFile: File | null, settings: WatermarkSettings, dirHandle: FileSystemDirectoryHandle | null) {
    if (!dirHandle || !watermarkFile) {
        console.log('No directory or watermark selected');
        return;
    }

    const newDirectoryHandle = await dirHandle.getDirectoryHandle('COPIES', { create: true });
    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const newFileHandle = await newDirectoryHandle.getFileHandle(file.name, {
            create: true
        });
        const writable = await newFileHandle.createWritable();

        const watermarkedImage = await applyWatermark(file, watermarkFile, settings);
        await watermarkedImage.stream().pipeTo(writable);

        console.log('Wrote file:', file.name);
    }
}

export async function generatePreview(files: File[], watermarkFile: File | null, settings: WatermarkSettings) {
    if (!files.length || !watermarkFile) {
        return;
    }

    const previewImage = await applyWatermark(files[0], watermarkFile, settings);
    return URL.createObjectURL(previewImage);
}

<script lang="ts">
	//import { selectDirectory, selectWatermark } from '$lib/fileHandler';
	import { onMount } from 'svelte';

	import FaRegImage from 'svelte-icons/fa/FaRegImage.svelte';
	import FaRegFolder from 'svelte-icons/fa/FaRegFolder.svelte';
	import FaRegFolderOpen from 'svelte-icons/fa/FaRegFolderOpen.svelte';
	import FaRegTimesCircle from 'svelte-icons/fa/FaRegTimesCircle.svelte';

	export let files: File[];
	export let watermarkFile: File | null;
	export let dirHandle: FileSystemDirectoryHandle | null;

	let dropzoneWatermark, dropzoneFolder; // Moved dropzone here

	function setupDropzone(dropzone, onFile, onDirectory) {
		if (dropzone) {
			dropzone.addEventListener('dragover', handleDragOver);
			dropzone.addEventListener('drop', (e) => handleDrop(e, onFile, onDirectory));
		} else {
			console.log('No dropzone');
		}

		return () => {
			if (dropzone) {
				dropzone.removeEventListener('dragover', handleDragOver);
				dropzone.removeEventListener('drop', handleDrop);
			}
		};
	}

	onMount(() => {
		setupDropzone(dropzoneWatermark, handleWatermarkFile, handleWatermarkDirectory);
		setupDropzone(dropzoneFolder, handleFolderFile, handleFolderDirectory);
	});

	function handleDragOver(e) {
		e.preventDefault();
	}

	async function handleDrop(e, onFile, onDirectory) {
		e.preventDefault();
		const fileHandlesPromises = [...e.dataTransfer.items]
			.filter((item) => item.kind === 'file')
			.map((item) => item.getAsFileSystemHandle());

		for await (const handle of fileHandlesPromises) {
			if (handle.kind === 'directory') {
				console.log(`Directory: ${handle.name}`);
				onDirectory(handle);
			} else {
				console.log(`File: ${handle.name}`);
				onFile(handle);
			}
		}
	}

	async function selectWatermark() {
		if (watermarkFile) return;
		const [fileHandle] = await window.showOpenFilePicker({
			types: [
				{
					description: 'Images',
					accept: {
						'image/png': ['.png'],
						'image/jpeg': ['.jpg', '.jpeg']
					}
				}
			]
		});
		await handleWatermarkFile(fileHandle);
	}

	async function selectDirectory() {
		console.log('Selecting directory');
		if (dirHandle) return;
		dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
		await handleFolderDirectory(dirHandle);
	}

	async function handleWatermarkFile(fileHandle) {
		watermarkFile = await fileHandle.getFile();
	}

	async function handleWatermarkDirectory(directory) {
		console.log('Unexpected directory in watermark dropzone');
	}

	async function handleFolderFile(file) {
		console.log('Unexpected file in folder dropzone');
	}

	async function handleFolderDirectory(directoryHandle) {
		dirHandle = directoryHandle;
		const promises = [];
		for await (const entry of dirHandle.values()) {
			if (entry.kind !== 'file') {
				continue;
			}
			//Check if images are .jpg or .jpeg or .png
			if (
				!entry.name.endsWith('.jpg') &&
				!entry.name.endsWith('.jpeg') &&
				!entry.name.endsWith('.png')
			) {
				continue;
			}
			promises.push(entry.getFile());
		}
		files = await Promise.all(promises);
	}
</script>

<div class="flex flex-row w-full gap-8 p-8">
	<div
		class="flex items-center justify-center w-full"
		bind:this={dropzoneFolder}
		on:click={selectDirectory}
		on:keydown={selectDirectory}
	>
		<div
			class="flex flex-col items-center justify-center w-96 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
		>
			{#if dirHandle}
				<div class="w-full h-full relative flex flex-col place-items-center">
					<div class="absolute top-4 right-4">
						<div
							class="w-8 h-8"
							on:click={() => (dirHandle = null)}
							on:keydown={() => (dirHandle = null)}
						>
							<FaRegTimesCircle />
						</div>
					</div>
					<div class="p-4 text-xl flex flex-col flex-grow h-full w-full">
						<div class="flex flex-row gap-4">
							<div class="w-8 h-8">
								<FaRegFolderOpen />
							</div>
							<div>/{dirHandle.name}</div>
						</div>
						<div class="flex flex-row gap-4">
							<div class="w-8 h-8">
								<FaRegImage />
							</div>
							<div>{files.length} images</div>
						</div>
						<div class="overflow-y-scroll flex-grow p-4">
							<ul>
								{#each files as file}
									<li>{file.name}</li>
								{/each}
							</ul>
						</div>
					</div>
				</div>
			{:else}
				<div class="flex flex-col items-center justify-center pt-5 pb-6">
					<div class="w-16">
						<FaRegFolder />
					</div>

					<h1 class="text-xl">Image folder</h1>
					<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span class="font-semibold">Click to select</span> or drag and drop
					</p>
				</div>
			{/if}
		</div>
	</div>

	<div
		class="flex items-center justify-center w-full"
		bind:this={dropzoneWatermark}
		on:click={selectWatermark}
		on:keydown={selectWatermark}
	>
		<div
			class="flex flex-col items-center justify-center w-96 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
		>
			{#if watermarkFile}
				<div class="w-full h-full relative flex place-items-center">
					<div class="absolute top-4 right-4">
						<div
							class="w-8 h-8"
							on:click={() => (watermarkFile = null)}
							on:keydown={() => (watermarkFile = null)}
						>
							<FaRegTimesCircle />
						</div>
					</div>
					<div class="p-4">
						<img src={URL.createObjectURL(watermarkFile)} alt="Watermark file" />
					</div>
				</div>
			{:else}
				<div class="flex flex-col items-center justify-center pt-5 pb-6">
					<div class="w-16">
						<FaRegImage />
					</div>

					<h1 class="text-xl">Watermark</h1>
					<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
						<span class="font-semibold">Click to select</span> or drag and drop
					</p>
					<p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG</p>
				</div>
			{/if}
		</div>
	</div>
</div>

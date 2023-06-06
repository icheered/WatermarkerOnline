<script lang="ts">
	import { selectDirectory, selectWatermark } from '$lib/fileHandler';
	import { onMount, onDestroy } from 'svelte';

	export let files: File[];
	export let watermarkFile: File | null;
	export let dirHandle: FileSystemDirectoryHandle | null;

	async function getDirectory() {
		({ dirHandle, files } = await selectDirectory(dirHandle));
	}

	async function getWatermarkFile() {
		watermarkFile = await selectWatermark();
	}

	let dropzone; // Moved dropzone here

	onMount(() => {
		if (dropzone) {
			dropzone.addEventListener('dragover', handleDragOver);
			dropzone.addEventListener('drop', handleDrop);
		} else {
			console.log('No dropzone');
		}
		return () => {
			if (dropzone) {
				dropzone.removeEventListener('dragover', handleDragOver);
				dropzone.removeEventListener('drop', handleDrop);
			}
		};
	});
	function handleDragOver(e) {
		// Prevent navigation.
		e.preventDefault();
	}

	async function handleDrop(e) {
		e.preventDefault();
		const fileHandlesPromises = [...e.dataTransfer.items]
			.filter((item) => item.kind === 'file')
			.map((item) => item.getAsFileSystemHandle());

		for await (const handle of fileHandlesPromises) {
			if (handle.kind === 'directory') {
				console.log(`Directory: ${handle.name}`);
			} else {
				console.log(`File: ${handle.name}`);
				watermarkFile = await handle.getFile();
			}
		}
	}
</script>

<div class="flex items-center justify-center w-full">
	<label
		for="dropzone-watermark"
		class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
	>
		<div class="flex flex-col items-center justify-center pt-5 pb-6">
			<svg
				aria-hidden="true"
				class="w-10 h-10 mb-3 text-gray-400"
				fill="none"
				stroke="currentColor"
				viewBox="0 0 24 24"
				xmlns="http://www.w3.org/2000/svg"
				><path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
				/></svg
			>
			<h1 class="text-xl">Watermark</h1>
			<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
				<span class="font-semibold">Click to select</span> or drag and drop
			</p>
			<p class="text-xs text-gray-500 dark:text-gray-400">PNG or JPG</p>
		</div>
		<input id="dropzone-watermark" type="file" class="hidden" bind:this={dropzone} />
	</label>
</div>

<button class="btn btn-primary" on:click={getDirectory}>Select a Directory</button>
<button class="btn btn-secondary" on:click={getWatermarkFile}>Select a Watermark</button>

<input id="watermark-upload" type="file" class="file-input file-input-bordered w-full max-w-xs" />

{#if watermarkFile}
	<h2>Watermark:</h2>
	<img src={URL.createObjectURL(watermarkFile)} />
{/if}

{#if dirHandle}
	<h2>Input Directory:</h2>
	<p>{dirHandle.name}</p>
	<h2>Number of Images:</h2>
	<p>{files.length}</p>
{/if}

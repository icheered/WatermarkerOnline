<script lang="ts">
	import { selectDirectory, selectWatermark } from '$lib/fileHandler';

	export let files: File[];
	export let watermarkFile: File | null;
	export let dirHandle: FileSystemDirectoryHandle | null;

	async function getDirectory() {
		({ dirHandle, files } = await selectDirectory(dirHandle));
	}

	async function getWatermarkFile() {
		watermarkFile = await selectWatermark();
	}
</script>

<button class="btn btn-primary" on:click={getDirectory}>Select a Directory</button>
<button class="btn btn-secondary" on:click={getWatermarkFile}>Select a Watermark</button>

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

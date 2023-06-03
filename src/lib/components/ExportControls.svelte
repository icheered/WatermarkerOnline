<script lang="ts">
	import { writeFiles } from '$lib/fileHandler';

	import type { WatermarkSettings } from '$lib/types';

	export let files: File[];
	export let watermarkFile: File | null;
	export let settings: WatermarkSettings;
	export let dirHandle: FileSystemDirectoryHandle | null;

	async function writeToDisk() {
		await writeFiles(files, watermarkFile, settings, dirHandle);
	}
</script>

{#if files && files.length > 0}
	<button class="btn btn-success" on:click={writeToDisk}>Copy Files to "COPIES"</button>
	<h2>Files:</h2>
	<ul>
		{#each files as file}
			<li>{file.name}</li>
		{/each}
	</ul>
{/if}

<br />

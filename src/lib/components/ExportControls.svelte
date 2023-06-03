<script>
	import { writeFiles } from '$lib/fileHandler.ts';

	export let files;
	export let watermarkFile;
	export let settings;
	export let dirHandle;

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

<script lang="ts">
	import type { WatermarkSettings } from '$lib/types';
	import { writeFiles } from '$lib/fileHandler';

	export let files: File[];
	export let dirHandle: FileSystemDirectoryHandle | null;
	export let watermarkFile: File | null;
	export let settings: WatermarkSettings;
	export let isExporting: boolean;

	async function writeToDisk() {
		isExporting = true;
		await writeFiles(files, watermarkFile, settings, dirHandle);
	}

	$: buttonAvailable = watermarkFile && files && files.length;
</script>

<button
	class="btn {buttonAvailable
		? 'border-none bg-primary-light dark:bg-primary-dark dark:text-white '
		: 'btn-disabled'} btn-lg"
	on:click={writeToDisk}>Export files!</button
>

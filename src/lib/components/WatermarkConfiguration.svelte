<script lang="ts">
	import type { WatermarkSettings } from '$lib/types';
	import RadioGrid from '$lib/components/RadioGrid.svelte';
	import Slider from '$lib/components/Slider.svelte';
	import { writeFiles } from '$lib/fileHandler';
	import FaCogs from 'svelte-icons/fa/FaCogs.svelte';

	export let files: File[];
	export let dirHandle: FileSystemDirectoryHandle | null;
	export let watermarkFile: File | null;
	export let settings: WatermarkSettings;
	export let isExporting: boolean;

	async function writeToDisk() {
		isExporting = true;
		await writeFiles(files, watermarkFile, settings, dirHandle);
	}
</script>

<div
	class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
>
	{#if watermarkFile}
		<RadioGrid bind:position={settings.watermarkPosition} />

		<div class="flex flex-col gap-4 p-4 w-full">
			<Slider bind:value={settings.opacity} min={0} max={100} name="Opacity" />
			<Slider bind:value={settings.scale} min={1} max={100} name="Scale" />
		</div>
		<button class="btn btn-success" on:click={writeToDisk}>Export files!</button>
	{:else}
		<div class="w-16">
			<FaCogs />
		</div>
		Configuration here
	{/if}
</div>

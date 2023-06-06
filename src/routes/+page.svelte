<script lang="ts">
	import FileSettings from '$lib/components/FileSettings.svelte';
	import WatermarkConfiguration from '$lib/components/WatermarkConfiguration.svelte';
	import PreviewWindow from '$lib/components/PreviewWindow.svelte';
	import Progress from '$lib/components/Progress.svelte';

	import type { WatermarkSettings } from '$lib/types';

	let isExporting = true;

	let watermarkFile: File | null = null;
	let files: File[] = [];
	let dirHandle: FileSystemDirectoryHandle | null = null;

	let settings: WatermarkSettings = {
		watermarkPosition: 'bottomright',
		opacity: 80,
		scale: 20
	};
</script>

<div class="flex flex-col justify-center place-items-center">
	<div class="text-5xl">Watermarker</div>
	<div>Quickly add a watermark to a lot of images</div>
	<FileSettings bind:watermarkFile bind:files bind:dirHandle />

	<div class="w-full flex flex-row justify-around p-4 gap-4">
		<div class="w-2/3">
			<PreviewWindow bind:files bind:watermarkFile bind:settings />
		</div>
		<div class="w-1/3">
			<WatermarkConfiguration
				bind:files
				bind:watermarkFile
				bind:settings
				bind:dirHandle
				bind:isExporting
			/>
		</div>
	</div>
	{#if isExporting}
		<Progress bind:files bind:isExporting bind:dirHandle bind:watermarkFile />
	{/if}
</div>

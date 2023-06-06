<script lang="ts">
	import FileSettings from '$lib/components/FileSettings.svelte';
	import WatermarkConfiguration from '$lib/components/WatermarkConfiguration.svelte';
	import PreviewWindow from '$lib/components/PreviewWindow.svelte';
	import ExportControls from '$lib/components/ExportControls.svelte';

	import type { WatermarkSettings } from '$lib/types';

	let watermarkFile: File | null = null;
	let files: File[] = [];
	let dirHandle: FileSystemDirectoryHandle | null = null;

	let settings: WatermarkSettings = {
		watermarkPosition: 'center'
	};
</script>

<div class="flex flex-col justify-center place-items-center">
	<div class="text-5xl">Title</div>
	<div>Explanation</div>
	<div class="flex flex-col">
		<FileSettings bind:watermarkFile bind:files bind:dirHandle />
	</div>

	<WatermarkConfiguration bind:watermarkFile bind:settings />
	<PreviewWindow bind:files bind:watermarkFile bind:settings />
	<ExportControls bind:files bind:watermarkFile bind:settings bind:dirHandle />
</div>

<script lang="ts">
	import FileSettings from '$lib/components/FileSettings.svelte';
	import WatermarkConfiguration from '$lib/components/WatermarkConfiguration.svelte';
	import PreviewWindow from '$lib/components/PreviewWindow.svelte';
	import ExportControls from '$lib/components/ExportControls.svelte';

	let watermarkFile: File | null = null;
	let files: File[] = [];
	let dirHandle: FileSystemDirectoryHandle | null = null;

	let settings = {
		watermarkPosition: 'center'
	};
</script>

<main>
	<FileSettings bind:watermarkFile bind:files bind:dirHandle />
	<WatermarkConfiguration bind:watermarkFile bind:settings />
	<PreviewWindow bind:files bind:watermarkFile bind:settings />
	<ExportControls bind:files bind:watermarkFile bind:settings bind:dirHandle />
</main>

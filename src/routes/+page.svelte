<script lang="ts">
	import FileSettings from '$lib/components/FileSettings.svelte';
	import WatermarkConfiguration from '$lib/components/WatermarkConfiguration.svelte';
	import PreviewWindow from '$lib/components/PreviewWindow.svelte';
	import Progress from '$lib/components/Progress.svelte';

	import WatermarkSelector from '$lib/components/WatermarkSelector.svelte';
	import FolderSelector from '$lib/components/FolderSelector.svelte';

	import type { WatermarkSettings } from '$lib/types';

	let isExporting = false;

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
	<ul class="steps steps-vertical w-2/3 pt-24">
		<li class="step step-primary w-full py-8">
			<div class="w-full flex flex-row h-full items-center justify-between">
				<div class="flex flex-col w-full pb-6">
					<div>Select watermark</div>
					<div class="h-1 bg-gray-700 w-full" />
				</div>

				<WatermarkSelector bind:watermarkFile />
			</div>
		</li>
		<li class="step step-primary w-full">
			<div class="w-full flex flex-row h-full items-center justify-between">
				<div class="flex flex-col w-full pb-6">
					<div>Select folder</div>
					<div class="h-1 bg-gray-700 w-full" />
				</div>
				<FolderSelector bind:files bind:dirHandle />
			</div>
		</li>
		<li class="step w-full">
			<div class="w-full flex flex-row h-full items-center justify-between">
				<div class="flex flex-col w-full pb-6">
					<div>Preview</div>
					<div class="h-1 bg-gray-700 w-full" />
				</div>
				<PreviewWindow bind:files bind:watermarkFile bind:settings />
			</div>
		</li>

		<li class="step w-full">
			<div class="w-full flex flex-row h-full items-center justify-between">
				<div class="flex flex-col w-full pb-6">
					<div>Configure</div>
					<div class="h-1 bg-gray-700 w-full" />
				</div>
				<WatermarkConfiguration
					bind:files
					bind:watermarkFile
					bind:settings
					bind:dirHandle
					bind:isExporting
				/>
			</div>
		</li>
	</ul>
	{#if isExporting}
		<Progress bind:files bind:isExporting bind:dirHandle bind:watermarkFile />
	{/if}
	<!-- <FileSettings bind:watermarkFile bind:files bind:dirHandle /> -->

	<!-- <div class="w-full flex flex-row justify-around p-4 gap-4">
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
	</div> -->
</div>

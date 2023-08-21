<script lang="ts">
	import WatermarkConfiguration from '$lib/components/WatermarkConfiguration/WatermarkConfiguration.svelte';
	import PreviewWindow from '$lib/components/PreviewWindow.svelte';

	import Stepper from '$lib/components/Stepper/Stepper.svelte';
	import Step from '$lib/components/Stepper/Step.svelte';

	import WatermarkSelector from '$lib/components/FileSelectors/WatermarkSelector.svelte';
	import FolderSelector from '$lib/components/FileSelectors/FolderSelector.svelte';
	import ExportButton from '$lib/components/ExportButton.svelte';

	import Progress from '$lib/components/Progress.svelte';
	import MobilePopup from '$lib/components/MobilePopup.svelte';
	import NonChromePopup from '$lib/components/NonChromePopup.svelte';

	import type { WatermarkSettings } from '$lib/types';

	let isExporting = false;

	let watermarkFileHandle: FileSystemFileHandle | null;
	let watermarkFile: File | null = null;

	let dirHandle: FileSystemDirectoryHandle | null = null;
	let files: File[] = [];

	let previewImageUrl: string = '';

	let settings: WatermarkSettings = {
		watermarkPosition: 'bottomright',
		opacity: 80,
		scale: 20,
		padding: 20
	};

	let currentStep = 1;

	$: {
		if (!watermarkFile || !watermarkFileHandle) {
			currentStep = 1;
		} else if (!dirHandle || !files) {
			currentStep = 2;
		} else if (!previewImageUrl) {
			currentStep = 3;
		} else {
			currentStep = 5;
		}
	}
</script>

<div class="flex flex-col justify-center place-items-center">
	<div class="text-7xl">Watermarker</div>
	<a href="https://icheered.nl/" target="_blank">
		Made by <span class="underline text-primary-light dark:text-primary-dark"> ICheered </span>
	</a>

	<Stepper>
		<Step number={1} bind:currentStep text="Select watermark" first={true}>
			<WatermarkSelector bind:watermarkFile bind:watermarkFileHandle />
		</Step>
		<Step number={2} bind:currentStep text="Select image folder">
			<FolderSelector bind:files bind:dirHandle />
		</Step>
		<Step number={3} bind:currentStep text="Preview image">
			<PreviewWindow bind:files bind:watermarkFile bind:settings bind:previewImageUrl />
		</Step>
		<Step number={4} bind:currentStep text="Adjust watermark">
			<WatermarkConfiguration bind:files bind:watermarkFile bind:settings />
		</Step>

		<Step number={5} bind:currentStep text="Export" last={true}>
			<ExportButton bind:files bind:watermarkFile bind:settings bind:dirHandle bind:isExporting />
		</Step>
	</Stepper>
	{#if isExporting}
		<Progress bind:files bind:isExporting bind:dirHandle bind:watermarkFile />
	{/if}
	<MobilePopup />
	<NonChromePopup />
</div>

<script lang="ts">
	import { generatePreview } from '$lib/fileHandler';

	import FaRegImage from 'svelte-icons/fa/FaRegImage.svelte';

	import type { WatermarkSettings } from '$lib/types';

	export let files: File[];
	export let watermarkFile: File | null;
	export let settings: WatermarkSettings;
	export let previewImageUrl: string = '';

	$: {
		if (files && files.length && watermarkFile && settings) {
			generatePreview(files, watermarkFile, settings).then((url) => {
				previewImageUrl = url ?? '';
			});
		}
	}

	$: isActive = previewImageUrl && watermarkFile && files && files.length;
</script>

<div
	class="flex flex-col items-center justify-center h-full border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600"
>
	{#if isActive}
		<img class="rounded-lg max-h-96" src={previewImageUrl} alt="Preview of final result" />
		<!-- <img class="rounded-lg max-h-96" src="horizontal.jpg" alt="Preview of final result" /> -->
	{:else}
		<div
			class="flex flex-col w-1/2 h-96 justify-center place-items-center text-gray-400 dark:text-gray-600"
		>
			<div class="w-16">
				<FaRegImage />
			</div>
			<div class="text-center">Preview image will be displayed here</div>
		</div>
	{/if}
</div>

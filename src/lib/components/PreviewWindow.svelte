<script lang="ts">
	import { generatePreview } from '$lib/fileHandler';

	import FaRegImage from 'svelte-icons/fa/FaRegImage.svelte';

	import type { WatermarkSettings } from '$lib/types';

	export let files: File[];
	export let watermarkFile: File | null;
	export let settings: WatermarkSettings;

	let previewImageUrl: string = '';

	$: {
		if (files && files.length && watermarkFile && settings) {
			generatePreview(files, watermarkFile, settings).then((url) => {
				previewImageUrl = url ?? '';
			});
		}
	}
</script>

<div
	class="flex flex-col items-center justify-center w-full h-full border-2 border-gray-300 border-dashed rounded-lg bg-gray-50 dark:bg-gray-700 dark:border-gray-600"
>
	{#if previewImageUrl}
		<img class="rounded-lg h-[600px]" src={previewImageUrl} alt="Preview of final result" />
		<!-- <img class="rounded-lg h-[600px]" src="vertical.jpg" /> -->
	{:else}
		<div class="h-96 flex flex-col w-full justify-center place-items-center">
			<div class="w-16">
				<FaRegImage />
			</div>
			<div>Preview image will be displayed here</div>
		</div>
	{/if}
</div>

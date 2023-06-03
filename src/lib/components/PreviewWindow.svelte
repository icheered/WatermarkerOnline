<script lang="ts">
	import { generatePreview } from '$lib/fileHandler';

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

	// some UI code goes here...
</script>

{#if previewImageUrl}
	<h2>Preview:</h2>
	<img src={previewImageUrl} />
{/if}

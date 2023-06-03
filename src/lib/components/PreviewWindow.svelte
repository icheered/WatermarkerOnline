<script>
	import { generatePreview } from '$lib/fileHandler.ts';

	export let files;
	export let watermarkFile;
	export let settings;
	let previewImageUrl = '';

	$: {
		if (files && files.length && watermarkFile && settings) {
			generatePreview(files, watermarkFile, settings).then((url) => {
				previewImageUrl = url;
			});
		}
	}

	// some UI code goes here...
</script>

{#if previewImageUrl}
	<h2>Preview:</h2>
	<img src={previewImageUrl} />
{/if}

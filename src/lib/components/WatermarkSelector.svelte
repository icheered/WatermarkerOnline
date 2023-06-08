<script lang="ts">
	import Dragzone from '$lib/components/Dropzone.svelte';

	export let watermarkFile: File | null;
	let watermarkFileHandle: FileSystemFileHandle | null;

	async function onClickSelectWatermark() {
		console.log('Clicked watermark');
		if (watermarkFile) return;
		[watermarkFileHandle] = await window.showOpenFilePicker({
			types: [
				{
					description: 'Images',
					accept: {
						'image/png': ['.png'],
						'image/jpeg': ['.jpg', '.jpeg']
					}
				}
			]
		});
		await getFilesFromHandle();
	}

	async function onDropHandleWatermark() {
		await getFilesFromHandle();
	}

	async function getFilesFromHandle() {
		watermarkFile = await watermarkFileHandle.getFile();
	}

	async function onCloseFunction() {
		watermarkFile = null;
		watermarkFileHandle = null;
		console.log('Closed watermark');
	}
</script>

<Dragzone
	bind:handle={watermarkFileHandle}
	expectedFormat="file"
	{onCloseFunction}
	handleDropFunction={onDropHandleWatermark}
	onClickFunction={onClickSelectWatermark}
>
	{#if watermarkFile}
		<div class="p-4">
			<img class="h-24" src={URL.createObjectURL(watermarkFile)} alt="Watermark file" />
		</div>
	{/if}
</Dragzone>

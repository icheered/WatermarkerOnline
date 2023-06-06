<script lang="ts">
	import { processedFiles } from '$lib/fileHandler';
	import { derived } from 'svelte/store';

	export let isExporting: boolean;
	export let files: File[];
	export let dirhandle: FileSystemDirectoryHandle | null;
	export let watermarkFile: File | null;

	let processing = false;

	// A derived store to calculate the files that still need to be processed
	const remainingFiles = derived([processedFiles], ([$processedFiles]) =>
		files.filter((file) => !$processedFiles.includes(file.name))
	);

	const progress = derived(
		[processedFiles, remainingFiles],
		([$processedFiles, $remainingFiles]) =>
			($processedFiles.length / ($processedFiles.length + $remainingFiles.length)) * 100
	);

	function handleCancel() {
		isExporting = false;
	}

	function handleDone() {
		dirhandle = null;
		watermarkFile = null;
		isExporting = false;
	}
</script>

<div class="w-full absolute bg-black/40">
	<h1 class="text-center text-white">Progress</h1>
</div>

<div class="modal" class:modal-open={isExporting}>
	<div class="modal-box relative">
		<div class="text-4xl font-bold w-full text-center">
			<div class="w-full flex justify-around">
				<div>Exporting</div>
				<div>{$processedFiles.length}/{files.length}</div>
			</div>
			<div class="mx-auto mt-4 bg-gray-300 w-3/4 rounded-full">
				<div
					class="bg-blue-500 text-xs leading-none py-1 text-center text-white rounded-full"
					style="width: {$progress}%"
				>
					{$progress.toFixed(0)}%
				</div>
			</div>
		</div>
		<div class="grid grid-cols-2 h-96 overflow-auto">
			<div>
				<h2 class="text-center text-white mt-4">Remaining Files</h2>
				<ul>
					{#each $remainingFiles as file}
						<li>{file.name}</li>
					{/each}
				</ul>
			</div>
			<div>
				<h2 class="text-center text-white mt-4">Processed Files</h2>
				<ul>
					{#each $processedFiles as file}
						<li>{file}</li>
					{/each}
				</ul>
			</div>
		</div>
		<div class="modal-action">
			{#if $remainingFiles.length}
				<button class="btn btn-error mt-4 mx-auto block">Cancel</button>
			{:else}
				<button
					class="btn btn-success mt-4 mx-auto block"
					on:click={handleDone}
					on:keydown={handleDone}>Done</button
				>
			{/if}
		</div>
	</div>
</div>

<script lang="ts">
	import { onMount } from 'svelte';

	import FaRegImage from 'svelte-icons/fa/FaRegImage.svelte';
	import FaRegFolder from 'svelte-icons/fa/FaRegFolder.svelte';
	import FaRegTimesCircle from 'svelte-icons/fa/FaRegTimesCircle.svelte';

	export let handle: FileSystemFileHandle | FileSystemDirectoryHandle | null;
	export let expectedFormat: 'file' | 'directory';
	export let title: string;
	export let handleDropFunction: Function;
	export let onClickFunction: Promise<void> | Function;
	export let onCloseFunction: Promise<void> | Function;

	let dropzone;

	onMount(() => {
		if (dropzone) {
			dropzone.addEventListener('dragover', handleDragOver);
			dropzone.addEventListener('drop', (e) => handleDrop(e));
		} else {
			console.log('No dropzone');
		}

		return () => {
			if (dropzone) {
				dropzone.removeEventListener('dragover', handleDragOver);
				dropzone.removeEventListener('drop', handleDrop);
			}
		};
	});

	function handleDragOver(e) {
		e.preventDefault();
	}

	async function handleDrop(e) {
		e.preventDefault();
		const fileHandlesPromises = [...e.dataTransfer.items]
			.filter((item) => item.kind === 'file')
			.map((item) => item.getAsFileSystemHandle());

		for await (const obtainedHandle of fileHandlesPromises) {
			if (obtainedHandle.kind === expectedFormat) {
				handle = obtainedHandle;
				handleDropFunction();
			} else {
				console.log(`Unexpected file type: ${obtainedHandle.name}`);
			}
		}
	}
</script>

<div
	class="flex items-center justify-center"
	bind:this={dropzone}
	on:click={onClickFunction}
	on:keydown={onClickFunction}
>
	<div
		class="flex flex-col items-center justify-center w-96 h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
	>
		{#if handle}
			<div class="w-full h-full relative flex flex-col place-items-center">
				<div class="absolute top-4 right-4">
					<div class="w-8 h-8" on:click={onCloseFunction} on:keydown={onCloseFunction}>
						<FaRegTimesCircle />
					</div>
				</div>
				<div class="p-4">
					<slot />
				</div>
			</div>
		{:else}
			<div class="flex flex-col items-center justify-center pt-5 pb-6">
				<div class="w-16">
					{#if expectedFormat == 'file'}
						<FaRegImage />
					{:else if expectedFormat == 'directory'}
						<FaRegFolder />
					{/if}
				</div>

				<h1 class="text-xl">{title}</h1>
				<p class="mb-2 text-sm text-gray-500 dark:text-gray-400">
					<span class="font-semibold">Click to select</span> or drag and drop
				</p>
			</div>
		{/if}
	</div>
</div>

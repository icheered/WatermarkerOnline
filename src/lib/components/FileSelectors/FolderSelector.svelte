<script lang="ts">
	import Dragzone from '$lib/components/FileSelectors/Dropzone.svelte';
	import FaRegFolderOpen from 'svelte-icons/fa/FaRegFolderOpen.svelte';
	import FaRegImage from 'svelte-icons/fa/FaRegImage.svelte';

	export let files: File[] | null;
	export let dirHandle: FileSystemDirectoryHandle | null;

	async function onClickDirectory() {
		console.log('Selecting directory');
		if (dirHandle) return;
		dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
		await getFilesFromDirectoryHandle();
	}

	async function onDropHandleDirectory() {
		await getFilesFromDirectoryHandle();
	}

	async function getFilesFromDirectoryHandle() {
		const promises = [];
		for await (const entry of dirHandle.values()) {
			if (entry.kind !== 'file') {
				continue;
			}
			//Check if images are .jpg or .jpeg or .png
			if (
				!entry.name.endsWith('.jpg') &&
				!entry.name.endsWith('.jpeg') &&
				!entry.name.endsWith('.png')
			) {
				continue;
			}
			promises.push(entry.getFile());
		}
		files = await Promise.all(promises);
	}

	async function onCloseFunction() {
		files = [];
		dirHandle = null;
		console.log('Closed files');
	}
</script>

<Dragzone
	bind:handle={dirHandle}
	expectedFormat="directory"
	title="Image folder"
	{onCloseFunction}
	handleDropFunction={onDropHandleDirectory}
	onClickFunction={onClickDirectory}
>
	<div class="p-4 text-xl flex flex-col flex-grow h-full w-full">
		<div class="flex flex-row gap-4">
			<div class="w-8 h-8">
				<FaRegFolderOpen />
			</div>
			<div>/{dirHandle.name}</div>
		</div>
		<div class="flex flex-row gap-4">
			<div class="w-8 h-8">
				<FaRegImage />
			</div>
			<div>{files.length} images</div>
		</div>
		<div class="overflow-y-scroll flex-grow p-4 h-36">
			<ul>
				{#each files as file}
					<li>{file.name}</li>
				{/each}
			</ul>
		</div>
	</div>
</Dragzone>

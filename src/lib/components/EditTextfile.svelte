<script>
	let fileContents = '';
	let fileHandle;

	async function openFile() {
		try {
			[fileHandle] = await window.showOpenFilePicker();
			const file = await fileHandle.getFile();
			fileContents = await file.text();
		} catch (e) {
			console.error(e);
		}
	}

	function addText() {
		fileContents += 'I added this in the browser';
	}

	async function saveFile() {
		try {
			const writable = await fileHandle.createWritable();
			await writable.write(fileContents);
			await writable.close();
		} catch (e) {
			console.error(e);
		}
	}
</script>

<button class="btn btn-primary" on:click={openFile}>Open file</button>
<button class="btn btn-secondary" on:click={addText}>Add text</button>
<button class="btn btn-accent" on:click={saveFile}>Save file</button>
<div class="bordered">
	Text:
	{fileContents != '' ? fileContents : 'No file selected'}
</div>

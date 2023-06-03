<script>
	let files = [];
	let dirHandle = null;

	$: filesProcessed = 0;

	let watermarkFile = null;

	let watermarkPosition = 'center';

	function updateWatermarkPosition(event) {
		watermarkPosition = event.target.value;
	}

	async function selectWatermark() {
		const [fileHandle] = await window.showOpenFilePicker();
		watermarkFile = await fileHandle.getFile();
	}

	async function selectDirectory() {
		dirHandle = await window.showDirectoryPicker({ mode: 'readwrite' });
		const promises = [];
		for await (const entry of dirHandle.values()) {
			if (entry.kind !== 'file') {
				continue;
			}
			promises.push(entry.getFile());
		}
		files = await Promise.all(promises);

		console.log('Files:', files);
	}

	async function applyWatermark(imageBlob, watermarkBlob) {
		const loadImage = (blob) => {
			const image = new Image();
			image.src = URL.createObjectURL(blob);
			return new Promise((res) => ((image.onload = res), (image.onerror = res))).then(() => image);
		};

		// Load the images.
		const [image, watermark] = await Promise.all([loadImage(imageBlob), loadImage(watermarkBlob)]);

		// Create a canvas and draw the image and watermark on it.
		const canvas = document.createElement('canvas');
		const ctx = canvas.getContext('2d');
		canvas.width = image.width;
		canvas.height = image.height;
		ctx.drawImage(image, 0, 0);
		let watermarkX;
		switch (watermarkPosition) {
			case 'left':
				watermarkX = 0;
				break;
			case 'right':
				watermarkX = image.width - watermark.width;
				break;
			default: // center
				watermarkX = (image.width - watermark.width) / 2;
				break;
		}
		ctx.drawImage(watermark, watermarkX, (image.height - watermark.height) / 2);

		// Convert the canvas back to a Blob.
		return new Promise((resolve) => canvas.toBlob(resolve, 'image/jpeg'));
	}

	async function writeFiles() {
		if (!dirHandle || !watermarkFile) {
			console.log('No directory or watermark selected');
			return;
		}

		const newDirectoryHandle = await dirHandle.getDirectoryHandle('COPIES', { create: true });

		for (let i = 0; i < files.length; i++) {
			const file = files[i];
			const newFileHandle = await newDirectoryHandle.getFileHandle(file.name, {
				create: true
			});
			const writable = await newFileHandle.createWritable();

			const watermarkedImage = await applyWatermark(file, watermarkFile);
			await watermarkedImage.stream().pipeTo(writable);

			filesProcessed += 1;
		}
	}

	async function generatePreview() {
		if (!files.length || !watermarkFile) {
			return;
		}

		const previewImage = await applyWatermark(files[0], watermarkFile);
		return URL.createObjectURL(previewImage);
	}

	let previewImageUrl = '';

	$: {
		if (files.length && watermarkFile && watermarkPosition) {
			generatePreview().then((url) => {
				previewImageUrl = url;
			});
		}
	}
</script>

{#if previewImageUrl}
	<h2>Preview:</h2>
	<img src={previewImageUrl} />
{/if}

<button class="btn btn-primary" on:click={selectDirectory}>Select a Directory</button>
<button class="btn btn-secondary" on:click={selectWatermark}>Select a Watermark</button>

{#if watermarkFile}
	<h2>Watermark:</h2>
	<img src={URL.createObjectURL(watermarkFile)} />
	<h2>Watermark Position:</h2>
	<select on:change={updateWatermarkPosition}>
		<option value="left">Left</option>
		<option value="center" selected>Center</option>
		<option value="right">Right</option>
	</select>
{/if}

{#if files && files.length > 0}
	<button class="btn btn-success" on:click={writeFiles}>Copy Files to "COPIES"</button>
	<h2>Files:</h2>
	<ul>
		{#each files as file}
			<li>{file.name}</li>
		{/each}
	</ul>
{/if}

<br />
Files processed: {filesProcessed} / {files.length}

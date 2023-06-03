<script lang="ts">
	export let settings;

	export let watermarkFile;

	async function updateWatermarkPosition(event) {
		settings.watermarkPosition = event.target.value;
	}
</script>

{#if watermarkFile}
	<h2>Watermark Position:</h2>
	<select on:change={updateWatermarkPosition}>
		<option value="left">Left</option>
		<option value="center" selected>Center</option>
		<option value="right">Right</option>
	</select>
{/if}

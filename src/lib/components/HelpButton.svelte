<script lang="ts">
	let modalOpen = false;
</script>

<div
	class="btn btn-neutral"
	on:click={() => (modalOpen = true)}
	on:keydown={() => (modalOpen = true)}
>
	Help
</div>

<div class="modal" class:modal-open={modalOpen}>
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-5xl">Watermarker</h3>

		<div class="custom-grid gap-2 p-4">
			<div class="text-left font-bold">What:</div>
			<div>Add a watermark to many images quickly</div>

			<div class="text-left font-bold">Why:</div>
			<div>
				<ul class="list-disc pl-4">
					<li>Protect your photography works</li>
					<li>Other tools are slow</li>
				</ul>
			</div>

			<div class="text-left font-bold">How:</div>
			<div>
				Select a watermark image and select a folder with photos. Configure the watermark and click
				'Export'.
			</div>
		</div>

		<div class="modal-action">
			<button
				class="btn"
				on:click={() => (modalOpen = false)}
				on:keydown={() => (modalOpen = false)}>Cool!</button
			>
		</div>
	</form>
</div>

<style>
	.custom-grid {
		display: grid;
		grid-template-columns: auto auto;
	}
</style>

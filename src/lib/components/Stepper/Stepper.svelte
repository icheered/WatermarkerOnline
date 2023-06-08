<!-- <table class="">
	<tbody>
		<slot />
	</tbody>
</table> -->

<!-- <div class="grid grid-cols-3">
	{#each [1, 2, 3] as i}
		<div>{i}</div>
		<div>line</div>
		<div class="w-72 h-72 bg-red-200">content</div>
	{/each}
</div> -->

<div class="custom-grid py-8">
	<slot />
</div>

<style>
	.custom-grid {
		display: grid;
		grid-template-columns: auto auto auto;
	}
</style>

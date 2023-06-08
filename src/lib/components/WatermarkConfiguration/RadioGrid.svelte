<script lang="ts">
	export let position: string;

	const positions = [
		'topleft',
		'topcenter',
		'topright',
		'left',
		'center',
		'right',
		'bottomleft',
		'bottomcenter',
		'bottomright'
	];
</script>

<div class="grid grid-cols-3 gap-4">
	{#each positions as pos}
		<input
			type="radio"
			class="radio checked:bg-primary-light dark:checked:bg-primary-dark"
			bind:group={position}
			value={pos}
			on:click={() => (position = pos)}
		/>
	{/each}
</div>

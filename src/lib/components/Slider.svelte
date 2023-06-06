<script lang="ts">
	export let value: number;
	export let name: string;
	export let min: number;
	export let max: number;

	let tempValue: number = value;

	const updateValue = () => {
		value = tempValue;
	};
</script>

<div class="grid grid-cols-5 items-center gap-2">
	<div class="col-span-1">{name}</div>

	<input
		type="range"
		{min}
		{max}
		bind:value={tempValue}
		on:change={(e) => (value = e.target.value)}
		class="range col-span-3"
	/>

	<input
		type="number"
		placeholder="Type here"
		bind:value={tempValue}
		on:blur={updateValue}
		on:keydown={(e) => e.key === 'Enter' && updateValue()}
		class="input input-bordered max-w-xs col-span-1 text-center"
	/>
</div>

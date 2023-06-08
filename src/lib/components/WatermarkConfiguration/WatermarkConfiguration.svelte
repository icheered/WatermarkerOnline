<script lang="ts">
	import type { WatermarkSettings } from '$lib/types';
	import RadioGrid from '$lib/components/WatermarkConfiguration/RadioGrid.svelte';
	import Slider from '$lib/components/WatermarkConfiguration/Slider.svelte';
	import FaCogs from 'svelte-icons/fa/FaCogs.svelte';

	export let files: File[];
	export let watermarkFile: File | null;
	export let settings: WatermarkSettings;

	$: isActive = watermarkFile && files && files.length;
</script>

<div
	class="flex flex-col items-center justify-center w-96 p-2 h-full border-2 border-gray-300 border-dashed rounded-lg dark:border-gray-600 {isActive
		? 'bg-gray-50 dark:bg-gray-700'
		: ''}"
>
	{#if isActive}
		<div class="flex flex-row place-items-center gap-8 justify-center w-full pt-4">
			<div>Position</div>
			<RadioGrid bind:position={settings.watermarkPosition} />
		</div>

		<div class="flex flex-col gap-4 p-4 w-full">
			<Slider bind:value={settings.opacity} min={0} max={100} name="Opacity" />
			<Slider bind:value={settings.scale} min={1} max={100} name="Scale" />
			<Slider bind:value={settings.padding} min={1} max={100} name="Offset" />
		</div>
	{:else}
		<div
			class="h-96 w-full flex flex-col justify-center place-items-center text-gray-400 dark:text-gray-600"
		>
			<div class="w-16">
				<FaCogs />
			</div>
			<div class="px-12 text-center">Watermark settings will be displayed here</div>
		</div>
	{/if}
</div>

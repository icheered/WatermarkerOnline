<script lang="ts">
	export let number: number;
	export let text = 'Text';
	export let first = false;
	export let last = false;

	export let currentStep = 1;

	$: isActive = currentStep >= number;

	$: style = isActive ? 'bg-primary-light dark:bg-primary-dark' : 'bg-gray-100 dark:bg-gray-700';
</script>

<div class="h-full flex flex-col justify-center place-items-center">
	<div class="h-full">
		{#if !first}
			<div class="h-full w-1 {style}" />
		{/if}
	</div>
	<div>
		<div class="flex items-center justify-center w-16 h-16 {style} rounded-full">
			<div
				class="w-14 h-14 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-full"
			>
				{number}
			</div>
		</div>
	</div>

	<div class="h-full">
		{#if !last}
			<div class="h-full w-1 {style}" />
		{/if}
	</div>
</div>
<div class="text-center h-full flex place-items-center">
	<div class="flex flex-col w-full pb-6 {isActive ? '' : 'text-gray-400 dark:text-gray-600'}">
		<div class="text-2xl px-8">{text}</div>
		<div class="h-1 w-full {style}" />
	</div>
</div>
<div class="py-8 flex justify-start"><slot /></div>

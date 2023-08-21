<script lang="ts">
	let modalOpen = false;

	import { onMount } from 'svelte';

	function isChromeBrowser() {
		let userAgent = navigator.userAgent;
		return /Chrome|Chromium/i.test(userAgent) && !/Edge|OPR/i.test(userAgent);
	}

	onMount(() => {
		if (!isChromeBrowser()) {
			modalOpen = true;
		}
	});
</script>

<div class="modal bg-red-200/50" class:modal-open={modalOpen}>
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-5xl">Please use Google Chrome!</h3>
		<p class="py-4 text-lg">
			This website uses modern web technologies that are only available on Google Chrome. It will
			probably not work on other browsers like Firefox or Safari.
		</p>
		<div class="modal-action">
			<button
				class="btn"
				on:click={() => (modalOpen = false)}
				on:keydown={() => (modalOpen = false)}>Close</button
			>
		</div>
	</form>
</div>

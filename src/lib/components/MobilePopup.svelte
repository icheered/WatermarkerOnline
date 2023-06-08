<script lang="ts">
	let modalOpen = false;

	import { onMount } from 'svelte';

	function getDevice() {
		let userAgent = navigator.userAgent || navigator.vendor || window.opera;
		// Windows Phone must come first because its UA also contains "Android"
		if (/windows phone/i.test(userAgent)) {
			return 'Windows Phone';
		}
		if (/android/i.test(userAgent)) {
			return 'Android';
		}
		// iOS detection
		if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
			return 'iOS';
		}
		return 'unknown';
	}

	onMount(() => {
		const device = getDevice();
		if (device === 'iOS' || device === 'Windows Phone' || device === 'Android') {
			modalOpen = true;
		}
	});
</script>

<div class="modal bg-red-200/50" class:modal-open={modalOpen}>
	<form method="dialog" class="modal-box">
		<h3 class="font-bold text-5xl">I only work on big screens!</h3>
		<p class="py-4 text-lg">
			This website was made specifically for laptops and desktops. It uses modern web technologies
			that are not available on mobile phones.
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

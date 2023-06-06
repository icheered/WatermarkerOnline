<script lang="ts">
	import '../app.postcss';

	import Navbar from '$lib/components/Navbar.svelte';
</script>

<div class="w-screen h-full">
	<Navbar />
	<slot />
</div>

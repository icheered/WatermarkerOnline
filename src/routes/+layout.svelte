<script lang="ts">
	import '../app.postcss';

	import Navbar from '$lib/components/Navbar.svelte';
	import Footer from '$lib/components/Footer.svelte';
</script>

<div class="w-full h-full">
	<Navbar />
	<slot />
	<Footer />
</div>

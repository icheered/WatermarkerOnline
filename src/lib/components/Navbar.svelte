<script lang="ts">
	import { enhance, type SubmitFunction } from '$app/forms';
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	import HelpButton from '$lib/components/HelpButton.svelte';

	import FaMoon from 'svelte-icons/fa/FaMoon.svelte';
	import FaSun from 'svelte-icons/fa/FaSun.svelte';

	const submitUpdateTheme: SubmitFunction = ({ action }) => {
		const theme = action.searchParams.get('theme');

		if (theme) {
			document.documentElement.setAttribute('data-theme', theme);
			document.documentElement.classList.toggle('dark', theme === 'dark');
			// Remove attribute 'swap-active' if theme is 'dark', add it if theme is 'light'
			document.getElementById('themeswitcher').classList.toggle('swap-active', theme === 'light');
		}
	};

	onMount(() => {
		const theme = document.documentElement.getAttribute('data-theme') ?? '';
		if (theme === 'light') {
			document.getElementById('themeswitcher').classList.toggle('swap-active', true);
		}
	});
</script>

<!-- DaisyUI swap component -->
<div class=" flex place-items-center justify-end h-full p-4 gap-x-8">
	<HelpButton />

	<a class="btn btn-neutral" href="https://icheered.nl/" target="_blank">Contact</a>
	<form method="POST" use:enhance={submitUpdateTheme}>
		<label id="themeswitcher" class="swap swap-rotate swap-active">
			<!-- this hidden checkbox controls the state -->
			<input type="checkbox" />

			<!-- sun icon -->
			<div class="swap-on fill-current w-10 h-10">
				<button formaction="/?/setTheme&theme=light&redirectTo={$page.url.pathname}"
					><FaMoon /></button
				>
			</div>

			<!-- moon icon -->
			<div class="swap-off fill-current w-10 h-10">
				<button formaction="/?/setTheme&theme=dark&redirectTo={$page.url.pathname}">
					<FaSun />
				</button>
			</div>
		</label>
	</form>
</div>

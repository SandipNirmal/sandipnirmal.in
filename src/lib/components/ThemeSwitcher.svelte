<script lang="ts">
	import { onMount } from 'svelte';
	import { browser } from '$app/environment';

	let currentTheme: 'light' | 'dark' = $state(
		browser
			? localStorage.theme || window.matchMedia('(prefers-color-scheme: dark)').matches
				? 'dark'
				: 'light'
			: 'light'
	);

	function setMode() {
		if (currentTheme === 'dark') {
			document.documentElement.classList.add('dark');
		} else {
			document.documentElement.classList.remove('dark');
		}
	}

	onMount(setMode);

	function toggleMode() {
		if (currentTheme === 'light') {
			localStorage.theme = 'dark';
			currentTheme = 'dark';
		} else {
			localStorage.theme = 'light';
			currentTheme = 'light';
		}
	}

	$effect(setMode);

	// // Whenever the user explicitly chooses to respect the OS preference
	// localStorage.removeItem('theme');
</script>

<div>
	<button
		class="h-9 w-9 rounded-full bg-slate-200 text-xl ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10"
		onclick={toggleMode}
	>
		{#if currentTheme === 'light'}
			🌘
		{:else}
			🌞
		{/if}
	</button>
</div>

<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { navs } from '$lib/data/navs';

	import '../app.css';
	import '../dracula.css';
	let { children } = $props();

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
</script>

<div
	class="relative mx-auto h-full min-h-screen w-screen bg-white/95 antialiased transition-colors duration-500 ease-in-out dark:bg-zinc-900"
>
	<div
		class="supports-backdrop-blur:bg-white/60 sticky top-0 z-40 w-full flex-none backdrop-blur lg:z-50"
	>
		<div class="px-4 py-3 lg:px-8">
			<div class="mx-auto max-w-7xl">
				<header class="relative flex items-center">
					<a href="/" class="font-bold sm:text-2xl dark:text-white">
						<img src="/logo.webp" alt="Sandip Nirmal" class="h-16 w-16 rounded-full" />
					</a>
					<div class="relative ml-auto flex flex-row-reverse items-center sm:flex-row">
						<Navbar />
						<div class="mx-2 flex items-center pl-2 sm:mx-4 sm:pl-6">
							<ThemeSwitcher />
						</div>
					</div>
				</header>
			</div>
		</div>
	</div>

	<main class="mx-auto mt-10 max-w-[52rem] px-4 pb-28 sm:px-6 md:px-8 lg:max-w-6xl xl:px-12">
		<div class="mt-16">
			{@render children()}
		</div>
	</main>

	<footer
		class="mx-auto max-w-5xl border-t border-slate-900/10 p-6 py-8 lg:px-8 dark:border-slate-300/10"
	>
		<ul class="flex space-x-4 text-sm text-zinc-800 dark:text-slate-300">
			{#each navs as nav}
				{#if nav.enabled}
					<li><a href={nav.link}>{nav.name}</a></li>
				{/if}
			{/each}
		</ul>
	</footer>
</div>

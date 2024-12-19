<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';

	import '../app.css';
	let { children } = $props();
</script>

<div
	class="relative mx-auto h-full min-h-screen w-screen bg-white/95 antialiased transition-colors duration-500 ease-in-out dark:bg-zinc-900"
>
	<div
		class="supports-backdrop-blur:bg-white/60 sticky top-0 z-40 w-full flex-none backdrop-blur lg:z-50"
	>
		<div class="px-4 py-3 lg:px-8">
			<div class="mx-auto max-w-7xl px-4">
				<header class="relative flex items-center">
					<h2 class="font-bold sm:text-2xl dark:text-white">
						<a href="/">Sandip Nirmal</a>
					</h2>
					<div class="relative ml-auto hidden items-center lg:flex">
						<Navbar />
						<div
							class="ml-6 flex items-center border-l border-slate-200 pl-6 dark:border-slate-800"
						>
							<ThemeSwitcher />
						</div>
					</div>
				</header>
			</div>
		</div>
	</div>

	<main class="mx-auto mt-10 max-w-[52rem] px-4 pb-28 sm:px-6 md:px-8 lg:max-w-6xl xl:px-12">
		<div class="mt-16">
			<article class="prose dark:prose-invert">
				{@render children()}
			</article>
		</div>
	</main>

	<footer
		class="mx-auto max-w-5xl border-t border-slate-900/10 p-4 lg:px-8 dark:border-slate-300/10"
	>
		<Navbar />
	</footer>
</div>

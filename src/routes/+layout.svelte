<script lang="ts">
	import Navbar from '$lib/components/Navbar.svelte';
	import '../app.css';
	let { children } = $props();
</script>

<article
	class="h-full w-full bg-slate-200 transition-colors duration-500 ease-in-out dark:bg-black"
>
	<div class="container relative mx-auto bg-white px-4 sm:px-8 lg:px-12 dark:bg-zinc-900">
		<div class="mx-auto max-w-2xl lg:max-w-5xl">
			<header class="flex items-center justify-between gap-4 py-4">
				<h2 class="text-2xl font-bold dark:text-white">
					<a href="/">Sandip Nirmal</a>
				</h2>
				<div class="flex items-center gap-2">
					<Navbar />
					<div>
						<button
							class="h-9 w-9 rounded-full bg-slate-200 text-xl ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10"
						>
							🌞
							<!-- 🌑 -->
						</button>
					</div>
				</div>
			</header>

			<main class="min-h-screen py-8 pb-12">
				<div class="mt-16">
					<article class="prose dark:prose-invert">
						{@render children()}
					</article>
				</div>
			</main>

			<footer class="border-t border-t-gray-600 py-8 dark:border-t-slate-400"></footer>
		</div>
	</div>
</article>

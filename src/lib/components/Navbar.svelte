<script lang="ts">
	let isNavOpen = $state(false);

	const navs = [
		{
			name: 'Articles',
			link: '/articles',
			enabled: true
		},
		{
			name: 'Apps',
			link: '/apps',
			enabled: false
		},
		{
			name: 'Games',
			link: '/games',
			enabled: true
		},
		{
			name: 'About',
			link: '/about',
			enabled: true
		}
	];

	function toggleNavModal() {
		isNavOpen = !isNavOpen;
	}
</script>

<nav class="hidden text-sm font-semibold leading-8 text-slate-700 sm:block dark:text-slate-200">
	<ul class="flex space-x-10">
		{#each navs as nav}
			{#if nav.enabled}
				<li>
					<a
						href={nav.link}
						class="px-2 py-1 transition hover:text-teal-500 focus:text-teal-500 dark:hover:text-teal-400 dark:focus:text-teal-400"
					>
						{nav.name}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

<button
	type="button"
	class="text-slate-500 hover:text-slate-600 sm:hidden dark:text-slate-400 dark:hover:text-slate-300"
	onclick={toggleNavModal}
>
	<span class="sr-only">Navigation</span>
	<svg width="24" height="24">
		<path
			d="M5 6h14M5 12h14M5 18h14"
			fill="none"
			stroke="currentColor"
			stroke-width="2"
			stroke-linecap="round"
		>
		</path>
	</svg>
</button>

{#if isNavOpen}
	<div class="fixed inset-0 z-50 lg:hidden" role="dialog" tabindex="-1" aria-modal="true">
		<div
			class="fixed inset-0 h-screen w-screen bg-black/20 backdrop-blur-sm dark:bg-zinc-900/10"
		></div>
		<div
			class="dark:highlight-white/5 fixed right-4 top-4 w-full max-w-xs rounded-lg bg-white p-6 text-base shadow-lg dark:bg-zinc-800"
		>
			<button
				type="button"
				class="absolute right-5 top-5 flex h-8 w-8 items-center justify-center text-slate-500 hover:text-slate-600 dark:text-slate-400 dark:hover:text-slate-300"
				onclick={toggleNavModal}
			>
				<span class="sr-only">Close navigation</span><svg
					viewBox="0 0 10 10"
					class="h-2.5 w-2.5 overflow-visible"
					aria-hidden="true"
				>
					<path
						d="M0 0L10 10M10 0L0 10"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					>
					</path>
				</svg>
			</button>
			<nav class="text-sm font-semibold leading-8 text-slate-700 dark:text-slate-200">
				<ul class="space-y-6">
					{#each navs as nav}
						{#if nav.enabled}
							<li
								class="w-full transition hover:text-teal-500 focus:text-teal-500 dark:hover:text-teal-400 dark:focus:text-teal-400"
							>
								<a href={nav.link} class="px-2 py-1">
									{nav.name}
								</a>
							</li>
						{/if}
					{/each}
				</ul>
			</nav>
		</div>
	</div>
{/if}

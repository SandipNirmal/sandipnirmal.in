<script lang="ts">
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
</script>

<nav
	class="flex rounded-full bg-white/90 p-2 px-3 text-sm font-medium text-zinc-800 shadow-md shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur dark:bg-zinc-800 dark:bg-zinc-800/90 dark:text-zinc-200 dark:ring-white/10"
>
	<ul class="flex items-center justify-between gap-4 px-2">
		{#each navs as nav}
			{#if nav.enabled}
				<li>
					<a
						href={nav.link}
						class="relative block transition hover:text-teal-500 dark:hover:text-teal-400"
					>
						{nav.name}</a
					>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

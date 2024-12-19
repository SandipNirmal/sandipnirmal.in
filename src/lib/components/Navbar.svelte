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

<nav class="text-sm font-semibold leading-8 text-slate-700 dark:text-slate-200">
	<ul class="flex space-x-10">
		{#each navs as nav}
			{#if nav.enabled}
				<li>
					<a href={nav.link} class="transition hover:text-teal-500 dark:hover:text-teal-400">
						{nav.name}
					</a>
				</li>
			{/if}
		{/each}
	</ul>
</nav>

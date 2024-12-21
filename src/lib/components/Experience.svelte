<script lang="ts">
	import { exeriences } from '$lib/data/experience.ts';
	let { size } = $props();
</script>

<div class="flex flex-wrap py-8">
	{#each exeriences as exerience}
		<div class="w-1/2 min-w-80 max-w-xl {size === 'sm' ? 'py-2' : 'py-4'}">
			<div class="flex items-center">
				<img
					src={exerience.logo}
					class="{size === 'sm' ? 'h-8 w-8' : 'h-10 w-10'} rounded-full"
					alt={exerience.company}
				/>
				<div class="py-1 pl-4 {size === 'sm' ? 'flex items-center' : ''}">
					<h5 class="font-semibold">{exerience.company}</h5>
					<p class="py-1 pl-2 text-xs text-zinc-700 dark:text-zinc-300">
						{exerience.start} - {exerience.end}
					</p>
				</div>
			</div>
			<div class="flex">
				<div class="w-10"></div>
			</div>
		</div>
	{/each}
</div>

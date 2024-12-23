<script lang="ts">
	const { title, timestamp, slug, blurb } = $props();
</script>

<article>
	<a href={`articles/${slug}`}>
		<div class="px-4 py-5 transition-all duration-300 hover:bg-zinc-800">
			<h4 class="text-xl font-semibold">{title}</h4>
			<span class="text-xs text-zinc-600 dark:text-zinc-400">
				Published: {new Date(timestamp).toDateString()}
			</span>
			<p class="py-2 text-sm">{blurb}</p>
		</div>
	</a>
</article>

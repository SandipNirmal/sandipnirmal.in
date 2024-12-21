<script lang="ts">
	let { children } = $props();
</script>

<article class="prose dark:prose-invert">
	{@render children()}
</article>

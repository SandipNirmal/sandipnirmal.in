<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<main class="container mx-auto">
	<nav class="py-4">
		<h2 class="text-xl font-semibold">Sandip Nirmal</h2>
	</nav>

	<div class="mt-16">
		<article class="prose">
			{@render children()}
		</article>
	</div>
</main>

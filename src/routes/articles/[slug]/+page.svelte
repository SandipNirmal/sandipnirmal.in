<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();

	const component = data.component;
</script>

<svelte:component this={component} />

<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	import type { SvelteComponent } from 'svelte';

	// @ts-expect-error component type mismatch
	const Component: SvelteComponent = data.component;
</script>

<svelte:head>
	<title>{data.title}</title>
	<meta name="description" content={data.blurb} />
</svelte:head>
<Component />

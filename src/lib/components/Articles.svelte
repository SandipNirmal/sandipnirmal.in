<script lang="ts">
	import { onMount } from 'svelte';

	import type { Article } from '$lib/types/types';
	import ArticleCard from './ArticleCard.svelte';

	let articles: Article[] = [];

	onMount(async () => {
		const res = await fetch('src/lib/data/articlesBlob.json');
		const allArticles = await res.json();

		articles = getLatestArticles(allArticles);
	});

	function getLatestArticles(articles: Record<string, Article>) {
		const articlesArray = Object.values(articles);
		const sortedArticles = articlesArray.sort((a, b) => b.timestamp - a.timestamp);
		return sortedArticles;
	}
</script>

<div>
	{#each articles as article}
		<ArticleCard {...article} />
	{/each}
</div>

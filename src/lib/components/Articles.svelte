<script lang="ts">
	import { onMount } from 'svelte';

	import type { Article } from '$lib/types/types';
	import ArticleCard from './ArticleCard.svelte';

	import allArticles from '$lib/data/articlesBlob.json';

	let articles: Article[] = [];

	onMount(async () => {
		articles = getLatestArticles(allArticles);
	});

	function getLatestArticles(articles: Record<string, Article>) {
		const articlesArray = Object.values(articles);
		const sortedArticles = articlesArray.sort((a, b) => b.timestamp - a.timestamp);
		return sortedArticles;
	}
</script>

<h2 class="px-4 pb-6 text-2xl font-bold">Recent Articles</h2>
<div>
	{#each articles as article}
		<ArticleCard {...article} />
	{/each}
</div>

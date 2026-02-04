import type { PageLoad } from './$types';
import { articles } from '$lib/data/articles';
import { error } from '@sveltejs/kit';

import type { EntryGenerator } from './$types';
import type { Article } from '$lib/types/types';
import allArticles from '$lib/data/articlesBlob.json';

export const load: PageLoad = ({ params }) => {
	if (articles[params.slug]) {
		// @ts-expect-error json
		const { title, blurb } = allArticles[params.slug];
		return {
			component: articles[params.slug],
			title,
			blurb
		};
	}

	error(404, 'Not found');
};

export const entries: EntryGenerator = async () => {
	const articlesArray: Article[] = Object.values(allArticles);
	return articlesArray.map(({ slug }) => ({
		slug
	}));
};

export const prerender = true;

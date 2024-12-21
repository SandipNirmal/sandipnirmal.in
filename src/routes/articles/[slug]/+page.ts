import type { PageLoad } from './$types';
import { articles } from '$lib/data/articles';

export const load: PageLoad = ({ params }) => {
	if (articles[params.slug]) {
		return {
			component: articles[params.slug]
		};
	} else {
		return {
			component: 'p'
		};
	}
};

export const prerender = true;

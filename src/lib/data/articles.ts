// import Introduction from '$lib/articles/introduction.svx';
// import HelloWorld from '$lib/articles/helloworld.svx';
import type { SvelteComponent } from 'svelte';

import IntroductionToPWA from '$lib/articles/introduction-to-pwa.svx';
import ReactCompoundComponent from '$lib/articles/compound-components-react-context.svx';
import MathToSolveUIProblem from '$lib/articles/simple-math-for-ui.svx';
import BuiltWith from '$lib/articles/built-with.svx';

export const articles: Record<string, SvelteComponent> = {
	// introduction: Introduction,
	// 'hello-world': HelloWorld,
	'introduction-to-pwa': IntroductionToPWA,
	'compound-components-with-react-context-api': ReactCompoundComponent,
	'simple-math-to-solve-ui-problem': MathToSolveUIProblem,
	'tools-and-technologies-behind-this-website': BuiltWith
};

<script lang="ts">
	import { QueryClient, QueryClientProvider } from '@tanstack/svelte-query';
	import PracticeContent from './PracticeContent.svelte';

	// Create QueryClient
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				staleTime: 1000 * 60 * 5,
				refetchOnWindowFocus: false
			}
		}
	});
</script>

<svelte:head>
	<title>Practice Mode - Abhyas</title>
	<meta
		name="description"
		content="Practice competitive exam questions with flashcard-style interface. NEET, JEE, UPSC, SSC and more."
	/>
</svelte:head>

<QueryClientProvider client={queryClient}>
	<PracticeContent />
</QueryClientProvider>

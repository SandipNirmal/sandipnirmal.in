<script lang="ts">
	// import Experience from '$lib/components/Experience.svelte';
	import Social from '$lib/components/Social.svelte';
</script>

<svelte:head>
	<title>Sandip Nirmal | Introduction</title>
	<meta name="description" content="Sandip Nirmal | Introduction" />
</svelte:head>

<article>
	<section class="flex flex-wrap justify-between">
		<div class="max-w-2xl pr-12">
			<div>
				<h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
					नमस्कार 🙏🏽
					<br /><br />
					I’m Sandip Nirmal, a Software developer and amateur runner.
				</h1>
				<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
					I’m Sandip Nirmal, a seasoned software developer with over a decade of experience in web
					and mobile development. I am currently working as a fullstack developer Atlassian. Before
					joining Atlassian, I had worked with couple of startup and esteemed organisation across
					EdTech, FinTech domains.
				</p>

				<Social />
			</div>
		</div>
		<!-- <div class="my w-80 pt-16">
			<h4 class="text-xl font-semibold">Work Experience</h4>
			<Experience size="sm" />
		</div> -->
	</section>
	<section class="py-8">
		<h4 class="text-xl font-semibold">Recent Articles</h4>
	</section>
</article>

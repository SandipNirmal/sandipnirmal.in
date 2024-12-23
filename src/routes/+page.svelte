<script lang="ts">
	// import Experience from '$lib/components/Experience.svelte';
	import Articles from '$lib/components/Articles.svelte';
	import Social from '$lib/components/Social.svelte';
</script>

<svelte:head>
	<title>Sandip Nirmal | Introduction</title>
	<meta name="description" content="Sandip Nirmal | Introduction" />
</svelte:head>

<article>
	<section class="flex flex-wrap justify-between px-4">
		<div class="max-w-3xl">
			<div>
				<h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
					नमस्कार 🙏🏽
					<br /><br />
					I’m Sandip Nirmal, a Software developer and amateur runner.
				</h1>
				<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
					I'm Sandip Nirmal a software professional with over a decade of expertise in full-stack
					development, specializing in web technologies. Currently serving as a Full Stack Developer
					at Atlassian, I brings extensive experience in architecting and delivering robust software
					solutions. Prior to joining Atlassian, I had work across different sectors which includes
					EdTech, Fintech, etc.
				</p>

				<Social />
			</div>
		</div>
		<!-- <div class="my w-80 pt-16">
			<h4 class="text-xl font-semibold">Work Experience</h4>
			<Experience size="sm" />
		</div> -->
	</section>
	<section class="py-16">
		<h2 class="px-4 pb-6 text-2xl font-semibold">Recent Articles</h2>
		<Articles />
	</section>
</article>

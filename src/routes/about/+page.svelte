<script lang="ts">
	import Experience from '$lib/components/Experience.svelte';
	import Social from '$lib/components/Social.svelte';
</script>

<article>
	<section class="flex flex-wrap">
		<div class="min-w-80 max-w-2xl">
			<h1 class="text-4xl font-bold tracking-tight text-zinc-800 sm:text-5xl dark:text-zinc-100">
				Sandip Nirmal
			</h1>
			<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
				I’m Sandip Nirmal, a seasoned software developer with over a decade of experience in web and
				mobile development. I am currently working as a fullstack developer Atlassian. Before
				joining Atlassian, I had worked with couple of startup and esteemed organisation across
				EdTech, FinTech domains.
			</p>

			<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
				I’m proficient in JavaScript, React, Svelte, Node.js, React Native, and Go. I remain
				committed to continuous learning and adaptation in the ever-evolving software development
				landscape. I welcome your visit and hope my work inspires and engages you.
			</p>

			<p class="mt-6 text-base text-zinc-600 dark:text-zinc-400">
				I am avid sports enthusiast and passionate runner, I've successfully completed my first full
				marathon in the Bengaluru 2024 Marathon.
			</p>

			<Social />
		</div>
		<div class="flex flex-1 items-center justify-center py-12 md:py-0">
			<enhanced:img
				src="/static/sandip_nirmal.jpeg"
				alt="Sandip Nirmal"
				class="w-60 min-w-60 rounded-xl shadow-2xl"
			/>
		</div>
	</section>
	<section class="py-12">
		<h2 class="text-3xl font-bold">Experience</h2>
		<Experience size="md" />
	</section>
</article>

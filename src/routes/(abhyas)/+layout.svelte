<script lang="ts">
	import '../../app.css';
	import '../../dracula.css';
	import ThemeSwitcher from '$lib/components/ThemeSwitcher.svelte';
	import { BookOpen } from 'lucide-svelte';

	let { children } = $props();
</script>

<div class="min-h-screen transition-colors duration-300">
	<!-- Minimal Header -->
	<header
		class="bg-[var(--practice-bg)]/95 sticky top-0 z-50 border-b border-[var(--practice-border)] backdrop-blur-sm"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<!-- Logo -->
				<a href="/" class="flex items-center gap-3 transition-opacity hover:opacity-80">
					<img src="/logo.webp" alt="Logo" class="h-10 w-10 rounded-full" />
					<div class="hidden sm:block">
						<span
							class="text-xl font-bold tracking-tight text-[var(--practice-text)]"
							style="font-family: var(--font-display);"
						>
							Abhyas
						</span>
						<span class="ml-2 text-[var(--practice-text-muted)]">/</span>
						<span
							class="ml-2 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--practice-accent)]"
						>
							<BookOpen class="h-4 w-4" />
							Practice
						</span>
					</div>
				</a>

				<!-- Theme Switcher -->
				<div class="flex items-center gap-4">
					<a
						href="/"
						class="text-sm text-[var(--practice-text-muted)] transition-colors hover:text-[var(--practice-text)]"
					>
						Back to Home
					</a>
					<ThemeSwitcher />
				</div>
			</div>
		</div>
	</header>

	<!-- Content -->
	<main>
		{@render children()}
	</main>
</div>

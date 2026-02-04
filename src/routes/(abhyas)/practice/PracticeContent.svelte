<script lang="ts">
	import { createQuery } from '@tanstack/svelte-query';
	import {
		getQuestions,
		getExams,
		getTopics,
		type Question,
		type Exam,
		type Topic
	} from '$lib/api/client';
	import { Flashcard } from '$lib/components/flashcard';
	import {
		Funnel,
		X,
		BookOpen,
		Target,
		Zap,
		ChevronDown,
		BarChart3,
		Trophy,
		Clock,
		Sparkles
		// ArrowLeft
	} from 'lucide-svelte';

	let currentIndex = $state(0);
	let selectedExam = $state<string>('');
	let selectedTopic = $state<string>('');
	let selectedDifficulty = $state<string>('');
	let showFilters = $state(true);

	// Stats tracking (session-based)
	let sessionStats = $state({
		attempted: 0,
		correct: 0,
		streak: 0,
		bestStreak: 0
	});

	const examsQuery = createQuery(() => ({
		queryKey: ['exams'] as const,
		queryFn: async () => {
			const result = await getExams();
			return result.data;
		}
	}));

	const topicsQuery = createQuery(() => ({
		queryKey: ['topics'] as const,
		queryFn: async () => {
			const result = await getTopics({ limit: 50 });
			return result.data;
		}
	}));

	const questionsQuery = createQuery(() => ({
		queryKey: ['questions', selectedExam, selectedTopic, selectedDifficulty] as const,
		queryFn: async () => {
			const result = await getQuestions({
				exam_id: selectedExam || undefined,
				topic_id: selectedTopic || undefined,
				difficulty: selectedDifficulty || undefined,
				limit: 50
			});
			return result.data;
		}
	}));

	const exams = $derived((examsQuery.data ?? []) as Exam[]);
	const topics = $derived((topicsQuery.data ?? []) as Topic[]);
	const questions = $derived((questionsQuery.data ?? []) as Question[]);
	const currentQuestion = $derived(questions[currentIndex]);

	// Active filter count
	const activeFilterCount = $derived(
		[selectedExam, selectedTopic, selectedDifficulty].filter(Boolean).length
	);

	function nextQuestion() {
		if (currentIndex < questions.length - 1) {
			currentIndex++;
		}
	}

	function previousQuestion() {
		if (currentIndex > 0) {
			currentIndex--;
		}
	}

	function resetFilters() {
		selectedExam = '';
		selectedTopic = '';
		selectedDifficulty = '';
		currentIndex = 0;
	}

	function handleFilterChange() {
		currentIndex = 0;
	}

	// Difficulty options
	const difficulties = [
		{ value: '', label: 'All Levels', icon: Sparkles },
		{ value: 'easy', label: 'Easy', icon: Zap, color: 'text-emerald-600' },
		{ value: 'medium', label: 'Medium', icon: Target, color: 'text-amber-600' },
		{ value: 'hard', label: 'Hard', icon: Trophy, color: 'text-rose-600' }
	];
</script>

<div class="min-h-screen">
	<!-- Header -->
	<header
		class="sticky top-1 z-50 border-b border-[var(--practice-border)] backdrop-blur-sm sm:hidden"
	>
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex h-16 items-center justify-between">
				<nav class="flex flex-1 items-center justify-end gap-4">
					<button
						class="flex items-center gap-2 rounded-lg bg-[var(--practice-muted)] px-3 py-2 text-sm font-medium"
						onclick={() => (showFilters = !showFilters)}
					>
						<Funnel class="h-4 w-4" />
						{#if activeFilterCount > 0}
							<span
								class="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--practice-accent)] text-xs text-white"
							>
								{activeFilterCount}
							</span>
						{/if}
					</button>
				</nav>
			</div>
		</div>
	</header>

	<main class="px-4 py-6 sm:px-6 sm:py-8 lg:px-8">
		<div class="mx-auto max-w-7xl">
			<!-- Page Title & Stats -->
			<div class="mb-8">
				<div class="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
					<div>
						<h1
							class="mb-2 text-3xl font-bold text-[var(--practice-text)] sm:text-4xl"
							style="font-family: var(--font-display);"
						>
							Practice Questions
						</h1>
						<p class="text-[var(--practice-text-muted)]">
							Master concepts through focused practice. Swipe or use keyboard to navigate.
						</p>
					</div>

					<!-- Session Stats -->
					<div class="flex items-center gap-3">
						<div
							class="stat-card flex items-center gap-2 rounded-xl border border-[var(--practice-border)] px-4 py-2"
						>
							<BarChart3 class="h-4 w-4 text-[var(--practice-accent)]" />
							<div class="text-right">
								<p class="text-xs text-[var(--practice-text-muted)]">Accuracy</p>
								<p class="text-sm font-semibold text-[var(--practice-text)]">
									{sessionStats.attempted > 0
										? Math.round((sessionStats.correct / sessionStats.attempted) * 100)
										: 0}%
								</p>
							</div>
						</div>
						<div
							class="stat-card flex items-center gap-2 rounded-xl border border-[var(--practice-border)] px-4 py-2"
						>
							<Zap class="h-4 w-4 text-amber-500" />
							<div class="text-right">
								<p class="text-xs text-[var(--practice-text-muted)]">Streak</p>
								<p class="text-sm font-semibold text-[var(--practice-text)]">
									{sessionStats.streak}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="flex flex-col gap-8 lg:flex-row">
				<!-- Filters Sidebar -->
				<aside class="shrink-0 lg:w-72 {showFilters ? 'block' : 'hidden'} lg:block">
					<div class="sticky top-24 space-y-6">
						<!-- Filter Card -->
						<div
							class="rounded-2xl border border-[var(--practice-border)] bg-[var(--practice-card)] p-5 shadow-sm"
						>
							<div class="mb-5 flex items-center justify-between">
								<h2 class="flex items-center gap-2 font-semibold text-[var(--practice-text)]">
									<Funnel class="h-4 w-4" />
									Filters
								</h2>
								{#if activeFilterCount > 0}
									<button
										class="flex items-center gap-1 text-xs text-[var(--practice-text-muted)] transition-colors hover:text-[var(--practice-error)]"
										onclick={resetFilters}
									>
										<X class="h-3 w-3" />
										Clear all
									</button>
								{/if}
							</div>

							<!-- Exam Filter -->
							<div class="mb-5">
								<label
									for="exam"
									class="mb-2 block text-sm font-medium text-[var(--practice-text)]"
								>
									Exam
								</label>
								<div class="relative">
									<select
										id="exam"
										class="hover:border-[var(--practice-accent)]/50 focus:ring-[var(--practice-accent)]/20 w-full cursor-pointer appearance-none rounded-xl border border-[var(--practice-border)] bg-[var(--practice-bg)] px-4 py-3 pr-10 text-sm transition-colors focus:border-[var(--practice-accent)] focus:outline-none focus:ring-2"
										bind:value={selectedExam}
										onchange={handleFilterChange}
									>
										<option value="">All Exams</option>
										{#each exams as exam}
											<option value={exam.id}>{exam.name}</option>
										{/each}
									</select>
									<ChevronDown
										class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--practice-text-muted)]"
									/>
								</div>
							</div>

							<!-- Topic Filter -->
							<div class="mb-5">
								<label
									for="topic"
									class="mb-2 block text-sm font-medium text-[var(--practice-text)]"
								>
									Topic
								</label>
								<div class="relative">
									<select
										id="topic"
										class="hover:border-[var(--practice-accent)]/50 focus:ring-[var(--practice-accent)]/20 w-full cursor-pointer appearance-none rounded-xl border border-[var(--practice-border)] bg-[var(--practice-bg)] px-4 py-3 pr-10 text-sm transition-colors focus:border-[var(--practice-accent)] focus:outline-none focus:ring-2"
										bind:value={selectedTopic}
										onchange={handleFilterChange}
									>
										<option value="">All Topics</option>
										{#each topics as topic}
											<option value={topic.id}>{topic.name}</option>
										{/each}
									</select>
									<ChevronDown
										class="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--practice-text-muted)]"
									/>
								</div>
							</div>

							<!-- Difficulty Filter -->
							<div>
								<span
									class="mb-3 block text-sm font-medium text-[var(--practice-text)]"
									id="difficulty-label"
								>
									Difficulty
								</span>
								<div class="grid grid-cols-2 gap-2" role="group" aria-labelledby="difficulty-label">
									{#each difficulties as diff}
										{@const IconComponent = diff.icon}
										<button
											class="filter-chip flex items-center justify-center gap-2 rounded-xl border px-3 py-2.5 text-sm transition-all {selectedDifficulty ===
											diff.value
												? 'bg-[var(--practice-accent)]/10 border-[var(--practice-accent)] text-[var(--practice-text)]'
												: 'hover:border-[var(--practice-accent)]/50 border-[var(--practice-border)] bg-[var(--practice-bg)] text-[var(--practice-text-muted)]'}"
											data-active={selectedDifficulty === diff.value}
											onclick={() => {
												selectedDifficulty = diff.value;
												handleFilterChange();
											}}
										>
											<IconComponent class="h-4 w-4 {diff.color || ''}" />
											<span>{diff.label}</span>
										</button>
									{/each}
								</div>
							</div>
						</div>

						<!-- Quick Stats Card -->
						<div
							class="rounded-2xl border border-[var(--practice-border)] bg-[var(--practice-card)] p-5 shadow-sm"
						>
							<h3 class="mb-4 flex items-center gap-2 font-semibold text-[var(--practice-text)]">
								<Clock class="h-4 w-4" />
								This Session
							</h3>
							<div class="space-y-3">
								<div class="flex items-center justify-between">
									<span class="text-sm text-[var(--practice-text-muted)]">Questions</span>
									<span class="text-sm font-semibold text-[var(--practice-text)]"
										>{sessionStats.attempted}</span
									>
								</div>
								<div class="flex items-center justify-between">
									<span class="text-sm text-[var(--practice-text-muted)]">Correct</span>
									<span class="text-sm font-semibold text-[var(--practice-success)]"
										>{sessionStats.correct}</span
									>
								</div>
								<div class="flex items-center justify-between">
									<span class="text-sm text-[var(--practice-text-muted)]">Best Streak</span>
									<span class="text-sm font-semibold text-amber-500">{sessionStats.bestStreak}</span
									>
								</div>
							</div>
						</div>
					</div>
				</aside>

				<!-- Main Content -->
				<div class="min-w-0 flex-1">
					{#if questionsQuery.isPending}
						<div class="flex items-center justify-center py-20">
							<div class="text-center">
								<div class="relative mx-auto mb-4 h-16 w-16">
									<div
										class="absolute inset-0 rounded-full border-4 border-[var(--practice-muted)]"
									></div>
									<div
										class="absolute inset-0 animate-spin rounded-full border-4 border-[var(--practice-accent)] border-t-transparent"
									></div>
								</div>
								<p class="text-[var(--practice-text-muted)]">Loading questions...</p>
							</div>
						</div>
					{:else if questionsQuery.isError}
						<div class="flex items-center justify-center py-20">
							<div class="max-w-md text-center">
								<div
									class="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[var(--practice-error-light)]"
								>
									<X class="h-8 w-8 text-[var(--practice-error)]" />
								</div>
								<p class="mb-2 font-semibold text-[var(--practice-error)]">
									Error loading questions
								</p>
								<p class="mb-4 text-sm text-[var(--practice-text-muted)]">
									{questionsQuery.error?.message || 'Something went wrong. Please try again.'}
								</p>
								<button
									class="rounded-xl bg-[var(--practice-text)] px-5 py-2.5 font-medium text-[var(--practice-bg)] transition-opacity hover:opacity-90"
									onclick={() => questionsQuery.refetch()}
								>
									Try Again
								</button>
							</div>
						</div>
					{:else if questions.length === 0}
						<div class="flex items-center justify-center py-20">
							<div class="max-w-md text-center">
								<div
									class="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[var(--practice-muted)]"
								>
									<BookOpen class="h-10 w-10 text-[var(--practice-text-muted)]" />
								</div>
								<h3
									class="mb-2 text-xl font-semibold text-[var(--practice-text)]"
									style="font-family: var(--font-display);"
								>
									No questions found
								</h3>
								<p class="mb-4 text-[var(--practice-text-muted)]">
									Try adjusting your filters or check back later for new content.
								</p>
								{#if activeFilterCount > 0}
									<button
										class="rounded-xl border border-[var(--practice-border)] bg-[var(--practice-card)] px-5 py-2.5 font-medium text-[var(--practice-text)] transition-colors hover:bg-[var(--practice-muted)]"
										onclick={resetFilters}
									>
										Clear Filters
									</button>
								{/if}
							</div>
						</div>
					{:else if currentQuestion}
						<Flashcard
							question={currentQuestion}
							{currentIndex}
							totalCount={questions.length}
							onNext={nextQuestion}
							onPrevious={previousQuestion}
						/>
					{/if}
				</div>
			</div>
		</div>
	</main>

	<!-- Decorative background elements -->
	<div class="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
		<div
			class="absolute -right-1/4 -top-1/2 h-[800px] w-[800px] rounded-full opacity-[0.02]"
			style="background: radial-gradient(circle, var(--practice-accent) 0%, transparent 70%);"
		></div>
		<div
			class="absolute -bottom-1/4 -left-1/4 h-[600px] w-[600px] rounded-full opacity-[0.02]"
			style="background: radial-gradient(circle, var(--practice-accent) 0%, transparent 70%);"
		></div>
	</div>
</div>

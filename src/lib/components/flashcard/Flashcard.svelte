<script lang="ts">
	import type { Question } from '$lib/api/client';
	import { ChevronUp, ChevronDown, RotateCcw, Check, X, Lightbulb, Keyboard } from 'lucide-svelte';

	let {
		question,
		showAnswer = $bindable(false),
		onNext,
		onPrevious,
		currentIndex,
		totalCount
	}: {
		question: Question;
		showAnswer?: boolean;
		onNext?: () => void;
		onPrevious?: () => void;
		currentIndex: number;
		totalCount: number;
	} = $props();

	let selectedOption = $state<string | null>(null);
	let isCorrect = $state<boolean | null>(null);
	let isShaking = $state(false);
	let showSuccessSweep = $state(false);
	let slideDirection = $state<'up' | 'down' | null>(null);
	let isAnimating = $state(false);
	let showKeyboardHints = $state(false);

	// Touch/drag state
	let isDragging = $state(false);
	let dragStartY = $state(0);
	let dragCurrentY = $state(0);
	let cardElement: HTMLDivElement | null = null;

	const dragThreshold = 80;

	function selectOption(key: string) {
		if (!showAnswer && !isAnimating) {
			selectedOption = key;
		}
	}

	function checkAnswer() {
		if (!selectedOption || isAnimating) return;

		showAnswer = true;
		isCorrect = selectedOption === question.correct_answer;

		if (isCorrect) {
			showSuccessSweep = true;
		} else {
			isShaking = true;
			setTimeout(() => {
				isShaking = false;
			}, 600);
		}
	}

	function getOptionClass(key: string): string {
		const base =
			'option-btn relative p-5 rounded-xl border-2 cursor-pointer text-left w-full flex items-start gap-4 transition-all';

		if (!showAnswer) {
			return selectedOption === key
				? `${base} border-[var(--practice-accent)] bg-[var(--practice-accent)]/5 shadow-sm`
				: `${base} border-[var(--practice-border)] hover:border-[var(--practice-accent)]/50 bg-[var(--practice-card)]`;
		}

		const isCorrectOption = key === question.correct_answer;
		const isSelected = key === selectedOption;

		if (isCorrectOption) {
			return `${base} border-[var(--practice-success)] bg-[var(--practice-success-light)]`;
		}
		if (isSelected && !isCorrectOption) {
			return `${base} border-[var(--practice-error)] bg-[var(--practice-error-light)]`;
		}
		return `${base} border-[var(--practice-border)] bg-[var(--practice-muted)]/30 opacity-50`;
	}

	function getLetterClass(key: string): string {
		const base =
			'w-10 h-10 rounded-full flex items-center justify-center text-base shrink-0 transition-all font-semibold';

		if (!showAnswer) {
			return selectedOption === key
				? `${base} bg-[var(--practice-accent)] text-white`
				: `${base} bg-[var(--practice-muted)] text-[var(--practice-text-muted)]`;
		}

		const isCorrectOption = key === question.correct_answer;
		const isSelected = key === selectedOption;

		if (isCorrectOption) {
			return `${base} bg-[var(--practice-success)] text-white`;
		}
		if (isSelected && !isCorrectOption) {
			return `${base} bg-[var(--practice-error)] text-white`;
		}
		return `${base} bg-[var(--practice-muted)] text-[var(--practice-text-muted)]`;
	}

	function getDifficultyConfig(
		difficulty: string | undefined
	): { bg: string; text: string; label: string } {
		switch (difficulty) {
			case 'easy':
				return {
					bg: 'bg-emerald-100 dark:bg-emerald-900/30',
					text: 'text-emerald-700 dark:text-emerald-400',
					label: 'Easy'
				};
			case 'medium':
				return {
					bg: 'bg-amber-100 dark:bg-amber-900/30',
					text: 'text-amber-700 dark:text-amber-400',
					label: 'Medium'
				};
			case 'hard':
				return {
					bg: 'bg-rose-100 dark:bg-rose-900/30',
					text: 'text-rose-700 dark:text-rose-400',
					label: 'Hard'
				};
			default:
				return {
					bg: 'bg-[var(--practice-muted)]',
					text: 'text-[var(--practice-text-muted)]',
					label: 'Unknown'
				};
		}
	}

	function resetCard() {
		selectedOption = null;
		showAnswer = false;
		isCorrect = null;
		isShaking = false;
		showSuccessSweep = false;
		slideDirection = null;
		isAnimating = false;
	}

	function navigateNext() {
		if (isAnimating || currentIndex >= totalCount - 1) return;

		isAnimating = true;
		slideDirection = 'up';

		setTimeout(() => {
			resetCard();
			onNext?.();
			slideDirection = 'down';

			setTimeout(() => {
				slideDirection = null;
				isAnimating = false;
			}, 400);
		}, 300);
	}

	function navigatePrevious() {
		if (isAnimating || currentIndex <= 0) return;

		isAnimating = true;
		slideDirection = 'down';

		setTimeout(() => {
			resetCard();
			onPrevious?.();
			slideDirection = 'up';

			setTimeout(() => {
				slideDirection = null;
				isAnimating = false;
			}, 400);
		}, 300);
	}

	// Touch handlers for swipe
	function handleTouchStart(e: TouchEvent) {
		if (isAnimating) return;
		isDragging = true;
		dragStartY = e.touches[0].clientY;
		dragCurrentY = e.touches[0].clientY;
	}

	function handleTouchMove(e: TouchEvent) {
		if (!isDragging || isAnimating) return;
		dragCurrentY = e.touches[0].clientY;
	}

	function handleTouchEnd() {
		if (!isDragging || isAnimating) return;

		const deltaY = dragStartY - dragCurrentY;

		if (deltaY > dragThreshold && currentIndex < totalCount - 1) {
			navigateNext();
		} else if (deltaY < -dragThreshold && currentIndex > 0) {
			navigatePrevious();
		}

		isDragging = false;
		dragStartY = 0;
		dragCurrentY = 0;
	}

	// Mouse drag handlers
	function handleMouseDown(e: MouseEvent) {
		if (isAnimating) return;
		isDragging = true;
		dragStartY = e.clientY;
		dragCurrentY = e.clientY;
	}

	function handleMouseMove(e: MouseEvent) {
		if (!isDragging || isAnimating) return;
		dragCurrentY = e.clientY;
	}

	function handleMouseUp() {
		if (!isDragging || isAnimating) return;

		const deltaY = dragStartY - dragCurrentY;

		if (deltaY > dragThreshold && currentIndex < totalCount - 1) {
			navigateNext();
		} else if (deltaY < -dragThreshold && currentIndex > 0) {
			navigatePrevious();
		}

		isDragging = false;
		dragStartY = 0;
		dragCurrentY = 0;
	}

	// Keyboard navigation
	function handleKeydown(e: KeyboardEvent) {
		if (isAnimating) return;

		switch (e.key) {
			case 'ArrowUp':
			case 'k':
				e.preventDefault();
				navigatePrevious();
				break;
			case 'ArrowDown':
			case 'j':
				e.preventDefault();
				navigateNext();
				break;
			case 'Enter':
			case ' ':
				e.preventDefault();
				if (!showAnswer && selectedOption) {
					checkAnswer();
				}
				break;
			case '1':
			case 'a':
			case 'A':
				e.preventDefault();
				if (!showAnswer && question.options?.A) selectOption('A');
				break;
			case '2':
			case 'b':
			case 'B':
				e.preventDefault();
				if (!showAnswer && question.options?.B) selectOption('B');
				break;
			case '3':
			case 'c':
			case 'C':
				e.preventDefault();
				if (!showAnswer && question.options?.C) selectOption('C');
				break;
			case '4':
			case 'd':
			case 'D':
				e.preventDefault();
				if (!showAnswer && question.options?.D) selectOption('D');
				break;
			case 'r':
			case 'R':
				e.preventDefault();
				if (showAnswer) resetCard();
				break;
			case '?':
				e.preventDefault();
				showKeyboardHints = !showKeyboardHints;
				break;
		}
	}

	// Calculate drag offset for visual feedback
	const dragOffset = $derived(isDragging ? dragStartY - dragCurrentY : 0);
	const constrainedOffset = $derived(Math.max(-50, Math.min(50, dragOffset * 0.3)));

	// Get animation class
	function getAnimationClass(): string {
		if (slideDirection === 'up' && isAnimating) {
			return currentIndex === totalCount - 1 ? '' : 'animate-slide-up-out';
		}
		if (slideDirection === 'down' && isAnimating) {
			return currentIndex === 0 ? '' : 'animate-slide-down-out';
		}
		if (slideDirection === 'up' && !isAnimating) return 'animate-slide-up-in';
		if (slideDirection === 'down' && !isAnimating) return 'animate-slide-down-in';
		return '';
	}

	// Reset when question changes externally
	$effect(() => {
		question;
		if (!isAnimating) {
			resetCard();
		}
	});

	// Progress percentage
	const progressPercent = $derived(((currentIndex + 1) / totalCount) * 100);
	const difficultyConfig = $derived(getDifficultyConfig(question.difficulty));
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="mx-auto w-full max-w-2xl select-none" role="region" aria-label="Flashcard practice">
	<!-- Progress Bar -->
	<div class="mb-6">
		<div class="mb-2 flex items-center justify-between">
			<span class="text-sm font-medium text-[var(--practice-text-muted)]" style="font-variant-numeric: tabular-nums;">
				Question <span class="text-[var(--practice-text)]">{currentIndex + 1}</span> of {totalCount}
			</span>
			<div class="flex items-center gap-3">
				{#if question.difficulty}
					<span
						class="rounded-full px-3 py-1 text-xs font-semibold {difficultyConfig.bg} {difficultyConfig.text}"
					>
						{difficultyConfig.label}
					</span>
				{/if}
				<span
					class="rounded-full bg-[var(--practice-muted)] px-3 py-1 text-xs font-medium uppercase tracking-wide text-[var(--practice-text-muted)]"
				>
					{question.question_type}
				</span>
			</div>
		</div>
		<div class="progress-track h-1.5 rounded-full">
			<div class="progress-fill h-full rounded-full" style="width: {progressPercent}%"></div>
		</div>
	</div>

	<!-- Flashcard -->
	<div
		bind:this={cardElement}
		class="flashcard paper-texture relative cursor-grab rounded-2xl border border-[var(--practice-border)] bg-[var(--practice-card)] p-8 shadow-lg active:cursor-grabbing {isShaking
			? 'animate-shake'
			: ''} {getAnimationClass()}"
		style="transform: translateY({constrainedOffset}px); box-shadow: var(--practice-shadow);"
		ontouchstart={handleTouchStart}
		ontouchmove={handleTouchMove}
		ontouchend={handleTouchEnd}
		onmousedown={handleMouseDown}
		onmousemove={handleMouseMove}
		onmouseup={handleMouseUp}
		onmouseleave={handleMouseUp}
		role="application"
		aria-label="Question card - drag up or down to navigate, or use keyboard shortcuts"
	>
		<!-- Decorative corners -->
		<div class="corner-flourish corner-flourish-tl"></div>
		<div class="corner-flourish corner-flourish-br"></div>

		<!-- Success sweep overlay -->
		{#if showSuccessSweep}
			<div
				class="pointer-events-none absolute inset-0 animate-success-sweep rounded-2xl bg-gradient-to-t from-[var(--practice-success)]/20 via-[var(--practice-success)]/10 to-transparent"
				aria-hidden="true"
			></div>
		{/if}

		<!-- Drag indicator -->
		<div
			class="drag-indicator absolute left-1/2 top-3 flex -translate-x-1/2 flex-col items-center gap-1 text-[var(--practice-text-muted)]"
		>
			<ChevronUp class="swipe-hint h-4 w-4" />
		</div>

		<!-- Question -->
		<div class="mb-8 pr-8">
			<p
				class="whitespace-pre-wrap text-xl leading-relaxed text-[var(--practice-text)]"
				style="font-family: var(--font-display);"
			>
				{question.question_text}
			</p>
		</div>

		<!-- Options -->
		{#if question.options}
			<div class="space-y-3">
				{#each Object.entries(question.options) as [key, value], i}
					<button
						class={getOptionClass(key)}
						onclick={() => selectOption(key)}
						disabled={showAnswer}
						aria-pressed={selectedOption === key}
						style="animation-delay: {i * 50}ms"
					>
						<span class={getLetterClass(key)}>
							{#if showAnswer && key === question.correct_answer}
								<Check class="h-5 w-5" />
							{:else if showAnswer && key === selectedOption && key !== question.correct_answer}
								<X class="h-5 w-5" />
							{:else}
								{key}
							{/if}
						</span>
						<span class="flex-1 pt-2 text-[var(--practice-text)]">
							{value}
						</span>
					</button>
				{/each}
			</div>
		{/if}

		<!-- Answer Feedback & Explanation -->
		{#if showAnswer}
			<div class="mt-8 space-y-4">
				<!-- Result indicator -->
				<div
					class="flex items-center gap-3 rounded-xl border p-4 {isCorrect
						? 'border-[var(--practice-success)]/20 bg-[var(--practice-success-light)]'
						: 'border-[var(--practice-error)]/20 bg-[var(--practice-error-light)]'}"
				>
					{#if isCorrect}
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--practice-success)]"
						>
							<Check class="h-5 w-5 text-white" />
						</div>
						<div>
							<p class="font-semibold text-[var(--practice-success)]">Correct!</p>
							<p class="text-sm text-[var(--practice-text-muted)]">Well done, keep going!</p>
						</div>
					{:else}
						<div
							class="flex h-10 w-10 items-center justify-center rounded-full bg-[var(--practice-error)]"
						>
							<X class="h-5 w-5 text-white" />
						</div>
						<div>
							<p class="font-semibold text-[var(--practice-error)]">Incorrect</p>
							<p class="text-sm text-[var(--practice-text-muted)]">
								The correct answer is <span class="font-semibold text-[var(--practice-success)]"
									>{question.correct_answer}</span
								>
							</p>
						</div>
					{/if}
				</div>

				<!-- Explanation -->
				{#if question.explanation}
					<div
						class="rounded-xl border-l-[3px] border-[var(--practice-success)] bg-[var(--practice-muted)]/50 p-4"
					>
						<div class="flex items-start gap-3">
							<Lightbulb class="mt-0.5 h-5 w-5 shrink-0 text-[var(--practice-accent)]" />
							<div>
								<p class="mb-1 text-sm font-semibold text-[var(--practice-text)]">Explanation</p>
								<p class="text-sm leading-relaxed text-[var(--practice-text-muted)]">
									{question.explanation}
								</p>
							</div>
						</div>
					</div>
				{/if}
			</div>
		{/if}

		<!-- Bottom drag indicator -->
		<div
			class="drag-indicator absolute bottom-3 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1 text-[var(--practice-text-muted)]"
		>
			<ChevronDown class="swipe-hint h-4 w-4" style="animation-delay: 0.5s" />
		</div>
	</div>

	<!-- Actions -->
	<div class="mt-6 flex items-center justify-between gap-4">
		<!-- Previous -->
		<button
			class="flex items-center gap-2 rounded-xl border border-[var(--practice-border)] bg-[var(--practice-card)] px-4 py-3 text-[var(--practice-text)] transition-all hover:border-[var(--practice-accent)]/50 hover:bg-[var(--practice-muted)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--practice-border)] disabled:hover:bg-[var(--practice-card)]"
			onclick={navigatePrevious}
			disabled={currentIndex === 0 || isAnimating}
			aria-label="Previous question"
		>
			<ChevronUp class="h-5 w-5" />
			<span class="hidden font-medium sm:inline">Previous</span>
			<span class="kbd hidden sm:inline">K</span>
		</button>

		<!-- Center actions -->
		<div class="flex items-center gap-3">
			{#if !showAnswer}
				<button
					class="rounded-xl bg-[var(--practice-text)] px-6 py-3 font-semibold text-[var(--practice-bg)] transition-all hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40 {selectedOption
						? 'animate-pulse-glow'
						: ''}"
					onclick={checkAnswer}
					disabled={!selectedOption || isAnimating}
					aria-label="Check answer"
				>
					Check Answer
					<span class="kbd ml-2 border-white/30 bg-white/20">Enter</span>
				</button>
			{:else}
				<button
					class="flex items-center gap-2 rounded-xl border-2 border-[var(--practice-border)] bg-[var(--practice-card)] px-5 py-3 font-medium text-[var(--practice-text)] transition-all hover:border-[var(--practice-accent)]/50 hover:bg-[var(--practice-muted)]"
					onclick={resetCard}
					aria-label="Try again"
				>
					<RotateCcw class="h-4 w-4" />
					Try Again
					<span class="kbd">R</span>
				</button>
			{/if}
		</div>

		<!-- Next -->
		<button
			class="flex items-center gap-2 rounded-xl border border-[var(--practice-border)] bg-[var(--practice-card)] px-4 py-3 text-[var(--practice-text)] transition-all hover:border-[var(--practice-accent)]/50 hover:bg-[var(--practice-muted)] disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:border-[var(--practice-border)] disabled:hover:bg-[var(--practice-card)]"
			onclick={navigateNext}
			disabled={currentIndex === totalCount - 1 || isAnimating}
			aria-label="Next question"
		>
			<span class="hidden font-medium sm:inline">Next</span>
			<span class="kbd hidden sm:inline">J</span>
			<ChevronDown class="h-5 w-5" />
		</button>
	</div>

	<!-- Keyboard hints toggle -->
	<div class="mt-6 flex justify-center">
		<button
			class="flex items-center gap-2 text-xs text-[var(--practice-text-muted)] transition-colors hover:text-[var(--practice-text)]"
			onclick={() => (showKeyboardHints = !showKeyboardHints)}
			aria-expanded={showKeyboardHints}
		>
			<Keyboard class="h-4 w-4" />
			<span>{showKeyboardHints ? 'Hide' : 'Show'} keyboard shortcuts</span>
			<span class="kbd">?</span>
		</button>
	</div>

	<!-- Keyboard shortcuts panel -->
	{#if showKeyboardHints}
		<div class="mt-4 rounded-xl border border-[var(--practice-border)] bg-[var(--practice-muted)]/50 p-4">
			<div class="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
				<div class="flex items-center gap-2">
					<span class="kbd">A-D</span>
					<span class="text-[var(--practice-text-muted)]">Select option</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="kbd">Enter</span>
					<span class="text-[var(--practice-text-muted)]">Check answer</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="kbd">R</span>
					<span class="text-[var(--practice-text-muted)]">Reset / Try again</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="kbd">J</span> or <span class="kbd">&darr;</span>
					<span class="text-[var(--practice-text-muted)]">Next question</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="kbd">K</span> or <span class="kbd">&uarr;</span>
					<span class="text-[var(--practice-text-muted)]">Previous question</span>
				</div>
				<div class="flex items-center gap-2">
					<span class="kbd">?</span>
					<span class="text-[var(--practice-text-muted)]">Toggle shortcuts</span>
				</div>
			</div>
		</div>
	{/if}

	<!-- Swipe hint for touch devices -->
	<p class="mt-4 text-center text-xs text-[var(--practice-text-muted)] sm:hidden">
		Swipe up/down to navigate between questions
	</p>
</div>

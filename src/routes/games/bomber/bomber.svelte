<script context="module" lang="ts">
	import type { Game, Scene } from 'phaser';

	export type TPhaserRef = {
		game: Game | null;
		scene: Scene | null;
	};
</script>

<script lang="ts">
	import { onMount } from 'svelte';
	import StartGame from './main';

	export let phaserRef: TPhaserRef = {
		game: null,
		scene: null
	};

	onMount(() => {
		// @ts-expect-error some properties missing
		phaserRef.game = StartGame('game-container');
	});
</script>

<div id="game-container" class="flex justify-center"></div>

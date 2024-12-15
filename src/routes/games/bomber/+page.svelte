<script lang="ts">
	import BomberGame, { type TPhaserRef } from './bomber.svelte';

	//  References to the PhaserGame component (game and scene are exposed)
	let phaserRef: TPhaserRef = { game: null, scene: null };
</script>

<BomberGame bind:phaserRef />

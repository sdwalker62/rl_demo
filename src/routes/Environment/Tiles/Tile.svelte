<script>
	import Goal from './Goal.svelte';
	import Obstacle from './Obstacle.svelte';
	import Player from './Player.svelte';
	import Standard from './Standard.svelte';

	export let state;
</script>

<div class="canvas" style="width: {100}%; height: {100}%">
	{#if state.type === 'standard'}
		<Standard {state} />
	{:else if state.type === 'player'}
		<Player {state} />
	{:else if state.type === 'obstacle'}
		<Obstacle />
	{:else if state.type === 'goal'}
		<Goal />
	{/if}
</div>

<style>
	.canvas {
		border-radius: 0px;
		background: #02006c;
		aspect-ratio: 1 / 1;
	}
</style>

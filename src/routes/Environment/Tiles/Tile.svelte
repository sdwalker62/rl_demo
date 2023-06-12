<script>
	import Goal from './Goal.svelte';
	import Obstacle from './Obstacle.svelte';
	import Player from './Player.svelte';
	import Standard from './Standard.svelte';

	export let state;
	export let width;
	export let height;
</script>

<div class="canvas" style="width: {width}%; height: {height}%">
	{#if state.type === 'standard'}
		<Standard {state} {width} {height} />
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
		background: #1f1f1f;
		/* aspect-ratio: 1 / 1; */
	}
</style>

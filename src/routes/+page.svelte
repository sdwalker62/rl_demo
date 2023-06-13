<script>
	import NavBar from './Navbar/NavBar.svelte';
	import Environment from './Environment/Environment.svelte';
	import AlgorithmPanel from './AlgorithmPanel/AlgorithmPanel.svelte';
	import MDP from './MDP.svelte';
	import Home from './Home.svelte';
	import { current_page } from '../store/shared_data';
</script>

<div class="canvas">
	<NavBar />
	{#if $current_page == 'home'}
		<Home />
	{:else if $current_page == 'mdp'}
		<MDP />
	{:else if $current_page == 'grid_world'}
		<div class="board">
			<Environment />
			<AlgorithmPanel />
		</div>
	{/if}
</div>

<style>
	.canvas {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
		margin: 0;
		padding: 0;
	}
	.board {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
		max-height: calc(100vh - 100px); /* 30 from nav, 2*20 for margin, 30 for scroll bar */
	}
</style>

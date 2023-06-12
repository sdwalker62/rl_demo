<script>
	import NavBar from './Navbar/NavBar.svelte';
	import Environment from './Environment/Environment.svelte';
	import AlgorithmPanel from './AlgorithmPanel/AlgorithmPanel.svelte';
	import { onMount } from 'svelte';
</script>

<div class="canvas">
	<NavBar />
	<div class="board">
		<Environment />
		<AlgorithmPanel />
	</div>
</div>

<style>
	.canvas {
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
		height: 100vh;
		width: 100vw;
		max-height: 100vh;
		max-width: 100vw;
	}
	.board {
		margin-left: 1em;
		display: flex;
		flex-direction: row;
		max-height: calc(95vh - 50px);
		width: 100vw;
	}
</style>

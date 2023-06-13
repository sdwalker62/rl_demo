<script>
	import NavBar from './Navbar/NavBar.svelte';
	import Environment from './Environment/Environment.svelte';
	import AlgorithmPanel from './AlgorithmPanel/AlgorithmPanel.svelte';
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

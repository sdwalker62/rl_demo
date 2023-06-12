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
		display: flex;
		flex-direction: column;
		margin: 0;
		padding: 0;
		height: calc(100vh - 70px);
		min-height: calc(100vh - 70px);
		max-height: calc(100vh - 70px);
	}
	.board {
		display: flex;
		flex-direction: row;
		width: 100%;
		height: 100%;
	}
</style>

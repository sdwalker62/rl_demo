<script>
	import NavBar from './Navbar/NavBar.svelte';
	import Environment from './Environment/Environment.svelte';
</script>

<div class="canvas">
	<NavBar />
	<div class="board">
		<Environment />
	</div>
</div>

<style>
	.canvas {
		display: flex;
		flex-direction: column;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	.board {
		width: 80vw;
		height: 90vh;
		max-height: 70vh;
		max-width: 80vw;
		margin-left: 1em;
		display: flex;
		flex-direction: row;
	}
</style>

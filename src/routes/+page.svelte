<script>
	import NavBar from './Navbar/NavBar.svelte';
	import Environment from './Environment/Environment.svelte';
</script>

<div class="canvas">
	<NavBar />
	<Environment />
</div>

<style>
	.canvas {
		display: flex;
		flex-direction: column;
		height: 100%;
		margin: 0;
		padding: 0;
	}
</style>

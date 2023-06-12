<script>
	import DarkMode from './DarkMode.svelte';
</script>

<div class="canvas">
	<span id="title">RL Academy</span>
	<DarkMode />
</div>

<style>
	.canvas {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: var(--background-color);
		width: calc(100% - 20px);
		height: 40px;
		margin: 5px;
		border-radius: 1px;
	}

	#title {
		margin-left: 0.5em;
		font-family: 'SF Pro Display Medium';
		font-size: 2em;
		color: white;
	}
</style>

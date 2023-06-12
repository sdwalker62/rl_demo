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
		background-color: white;
		width: 100%;
		height: 30px;
		min-height: 30px;
		max-height: 30px;
		border-radius: 1px;
	}

	#title {
		margin-left: 0.5em;
		font-family: 'SF Pro Display Medium';
		font-size: 1.2em;
		font-weight: bold;
		color: black;
	}
</style>

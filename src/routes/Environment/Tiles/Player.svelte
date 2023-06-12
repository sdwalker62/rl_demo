<script>
	export let state;
</script>

<div class="canvas" style="width: {100}%; height: {100}%">
	<div class="standard">
		<div class="info">
			<p class="icon">
				<i id="player" class="fa-solid fa-robot" />
			</p>
		</div>
	</div>
</div>

<style>
	.canvas {
		display: flex;
		background: #0c0c0c;
		aspect-ratio: 1 / 1;
		align-items: center;
		justify-content: center;
	}

	.standard {
		background: #0c0c0c;
		aspect-ratio: 1 / 1;
		width: 99.5%;
		height: 99.5%;
		align-items: center;
		justify-content: center;
	}

	.info {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.icon {
		display: inline-block;
		text-align: center;
	}

	#player {
		color: #ffffff;
		flex-grow: 1;
		font-size: 3em;
	}

	.value {
		flex-grow: 2;
		font-size: 1em;
		font-family: 'SF Pro';
		color: white;
	}
</style>

<script>
</script>

<div class="canvas" style="width: {100}%; height: {100}%">
	<div class="obstacle">
		<p class="icon">
			<i id="obstacle" class="fa-solid fa-road-barrier" />
		</p>
	</div>
</div>

<style>
	.canvas {
		display: flex;
		background: #02006c;
		aspect-ratio: 1 / 1;
		align-items: center;
		justify-content: center;
	}

	.obstacle {
		border-radius: 0px;
		background: linear-gradient(145deg, #020074, #020061);
		box-shadow: 5px 5px 7px #01002b, -5px -5px 7px #0300ad;
		aspect-ratio: 1 / 1;
		width: calc(100% - 10px);
		height: calc(100% - 10px);
		align-items: center;
		justify-content: center;
	}

	.icon {
		display: inline-block;
		text-align: center;
		vertical-align: middle;
		width: 100%;
		height: 100%;
	}

	#obstacle {
		color: #ff0033;
		flex-grow: 1;
		font-size: 3em;
	}
</style>

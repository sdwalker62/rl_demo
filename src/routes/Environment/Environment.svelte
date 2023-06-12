<script>
	import Tile from './Tiles/Tile.svelte';
	import { grid_world, environment, current_frame, replay_history } from '../../store/shared_data';

	let size;
	$: if ($environment.n_cols > $environment.n_rows) {
		size = 100 / $environment.n_cols;
	} else {
		size = 100 / $environment.n_rows;
		console.log(size);
	}
	let width = 80 / $environment.n_cols;
	let height = 80 / $environment.n_rows;
</script>

<div id="background">
	{#key $grid_world}
		<div class="canvas">
			{#each $grid_world as row}
				<div class="gridworld-row">
					{#each row as state}
						<Tile {state} {width} {height} />
					{/each}
				</div>
			{/each}
		</div>
	{/key}

	<div id="replay_slider">
		<input
			type="range"
			min="1"
			max={String($replay_history.length - 1)}
			bind:value={$current_frame}
			class="slider"
		/>
	</div>
</div>

<style>
	#background {
		height: 95vh;
		width: 95vw;
		background-color: #1f1f1f;
		display: flex;
		flex-direction: column;
		box-shadow: 5px 5px 40px #0c0c0c;
		align-items: center;
		justify-content: center;
	}
	.canvas {
		width: 99.5%;
		height: 96%;
		align-items: center;
		justify-content: center;
	}
	.gridworld-row {
		display: flex;
		flex-direction: row;
	}

	#replay_slider {
		width: 100%;
	}

	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 100%;
		height: 30px;
		background: var(--transparency-color);
		outline: none;
		opacity: 0.7;
		-webkit-transition: 0.2s;
		transition: opacity 0.2s;
	}

	.slider:hover {
		opacity: 1;
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 30px;
		height: 30px;
		background: #ffffff;
		cursor: pointer;
	}
</style>

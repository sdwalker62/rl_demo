<script>
	import Tile from './Tiles/Tile.svelte';
	import { grid_world, environment, current_frame, replay_history } from '../../store/shared_data';

	$environment = {
		n_cols: 10,
		n_rows: 10,
		action_cost: -1,
		obstacles: [2, 7, 14],
		penalty_states: {
			12: 0
		},
		goal_states: {
			24: 400,
			8: 100
		},
		initial_action: 0,
		initial_value: 0,
		initial_state: 0,
		terminal_states: [24, 8]
	};

	let larger_axis;
	let size;
	$: if ($environment.n_cols > $environment.n_rows) {
		size = 100 / $environment.n_cols;
	} else {
		size = 100 / $environment.n_rows;
		console.log(size);
	}
</script>

<div id="background">
	<div class="grid_world_container">
		{#key $grid_world}
			<div class="canvas">
				{#each $grid_world as row}
					<div class="gridworld-row" style="height: {10}%; width: {10}%">
						{#each row as state}
							<Tile {state} />
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
</div>

<style>
	#background {
		height: 100%;
		width: 100%;
		border-radius: 10px;
		border-width: 0px;
		background-color: #1f1f1f;
		display: flex;
		box-shadow: 5px 5px 40px #0c0c0c;
	}
	.canvas {
		width: 99.5%;
		height: 96%;
		border-radius: 1000px;
	}
	.gridworld-row {
		display: flex;
		flex-direction: row;
	}

	.grid_world_container {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		align-items: center;
		justify-content: center;
	}

	.slider {
		-webkit-appearance: none; /* Override default CSS styles */
		appearance: none;
		width: 100%; /* Full-width */
		height: 25px; /* Specified height */
		background: #d3d3d3; /* Grey background */
		outline: none; /* Remove outline */
		opacity: 0.7; /* Set transparency (for mouse-over effects on hover) */
		-webkit-transition: 0.2s; /* 0.2 seconds transition on hover */
		transition: opacity 0.2s;
	}

	.slider:hover {
		opacity: 1; /* Fully shown on mouse-over */
	}

	.slider::-webkit-slider-thumb {
		-webkit-appearance: none;
		appearance: none;
		width: 25px;
		height: 25px;
		background: #6dffca;
		cursor: pointer;
	}
</style>

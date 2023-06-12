<script>
	import Tile from './Tiles/Tile.svelte';
	import { grid_world, environment, current_frame, replay_history } from '../../store/shared_data';

	$environment = {
		n_cols: 5,
		n_rows: 5,
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

<div class="grid_world_container">
	{#key $grid_world}
		<div class="canvas">
			{#each $grid_world as row}
				<div class="gridworld-row" style="height: {size}%; width: {$environment.n_cols * size}%">
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
			id="myRange"
		/>
	</div>
</div>

<style>
	.canvas {
		width: 100%;
		height: 100%;
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
	}

	.slider {
		width: 80vw;
	}
</style>

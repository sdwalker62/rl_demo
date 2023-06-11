<script>
	import Tile from './Tiles/Tile.svelte';
	import { grid_world, environment } from '../../store/shared_data';

	$environment = {
		n_cols: 5,
		n_rows: 5,
		action_cost: -1,
		obstacles: [2, 7, 14],
		penalty_states: {
			12: -10
		},
		goal_states: {
			24: 100,
			8: 100
		},
		initial_action: 0,
		initial_value: 0,
		initial_state: 0,
		terminal_states: [24, 8]
	};

	let larger_axis;
	if ($environment.n_cols > $environment.n_rows) {
		larger_axis = $environment.n_cols;
	} else {
		larger_axis = $environment.n_rows;
	}
	const size = 100 / larger_axis;
</script>

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

<style>
	.canvas {
		width: 80%;
		height: 100%;
	}
	.gridworld-row {
		display: flex;
		flex-direction: row;
	}
</style>

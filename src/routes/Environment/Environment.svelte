<script>
	import Tile from './Tiles/Tile.svelte';
	import {
		n_cols,
		n_rows,
		replay_history,
		n_states,
		obstacles,
		goals
	} from '../../store/shared_data';

	$n_cols = 5;
	$n_rows = 5;
	let state = {
		type: 'standard',
		policy_action: 'left',
		value: 1000
	};

	let grid_world = Array.from(Array($n_rows), (_) => Array($n_cols).fill(state));
	$: if ($replay_history.length != 0) {
		grid_world = populate_map($replay_history, grid_world);
		grid_world = grid_world;
	}
	function populate_map(env, grid_world) {
		if (env.length != 0) {
			for (let state_idx = 0; state_idx < $n_states; state_idx++) {
				const row_idx = Math.floor(state_idx / $n_cols);
				const col_idx = state_idx % $n_cols;
				if ($obstacles.includes(state_idx)) {
					grid_world[row_idx][col_idx] = {
						type: 'obstacle'
					};
				} else {
					grid_world[row_idx][col_idx] = {
						type: 'standard',
						policy_action: env[env.length - 1].policy[state_idx],
						value: env[env.length - 1].state_values[state_idx]
					};
				}
			}
			return grid_world;
		}
	}

	// grid_world[3][4] = {
	// 	type: 'obstacle'
	// };

	// grid_world[2][2] = {
	// 	type: 'obstacle'
	// };
	// grid_world[1][2] = {
	// 	type: 'obstacle'
	// };

	// grid_world[4][4] = {
	// 	type: 'goal',
	// 	value: -100
	// };

	let larger_axis;
	if (n_cols > n_rows) {
		larger_axis = $n_cols;
	} else {
		larger_axis = $n_rows;
	}
	const size = 100 / larger_axis;
</script>

<div class="canvas">
	{#each grid_world as row}
		<div class="gridworld-row" style="height: {size}%; width: {$n_cols * size}%">
			{#each row as state}
				<Tile {state} />
			{/each}
		</div>
	{/each}
</div>

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

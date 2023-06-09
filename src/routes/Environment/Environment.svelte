<script>
	import Tile from './Tiles/Tile.svelte';
	import { replay_history } from '../../store/shared_data';

	$: console.log($replay_history);

	let n_cols = 5;
	let n_rows = 5;

	let state = {
		type: 'standard',
		policy_action: 'left',
		value: 1000
	};
	let grid_world = Array.from(Array(n_rows), (_) => Array(n_cols).fill(state));

	grid_world[3][4] = {
		type: 'obstacle'
	};

	grid_world[2][2] = {
		type: 'obstacle'
	};
	grid_world[1][2] = {
		type: 'obstacle'
	};

	grid_world[4][4] = {
		type: 'goal',
		value: -100
	};

	let larger_axis;
	if (n_cols > n_rows) {
		larger_axis = n_cols;
	} else {
		larger_axis = n_rows;
	}
	const size = 100 / larger_axis;
</script>

<div class="canvas">
	{#each grid_world as row}
		<div class="gridworld-row" style="height: {size}%; width: {n_cols * size}%">
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

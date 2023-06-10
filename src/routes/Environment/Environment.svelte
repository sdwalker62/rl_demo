<script>
	import Tile from './Tiles/Tile.svelte';
	import { n_cols, n_rows, grid_world } from '../../store/shared_data';

	$n_cols = 10;
	$n_rows = 10;

	let larger_axis;
	if (n_cols > n_rows) {
		larger_axis = $n_cols;
	} else {
		larger_axis = $n_rows;
	}
	const size = 100 / larger_axis;
</script>

{#key $grid_world}
	<div class="canvas">
		{#each $grid_world as row}
			<div class="gridworld-row" style="height: {size}%; width: {$n_cols * size}%">
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

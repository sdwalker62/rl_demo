<script>
	import Tile from './Tiles/Tile.svelte';
	import { grid_world, environment, current_frame, replay_history } from '../../store/shared_data';

	$: grid_rows = `${'1fr '.repeat($environment.n_rows)};`;
	$: grid_cols = `${'1fr '.repeat($environment.n_cols)};`;
	$: grid_style = `grid-template-columns: ${grid_cols}; grid-template-rows: ${grid_rows}; gap: 0px 0px`;
</script>

<div id="background">
	{#key $grid_world}
		<div id="grid-container" style={grid_style}>
			{#each $grid_world as state}
				<Tile {state} />
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
		background-color: #1f1f1f;
		display: flex;
		flex-direction: column;
		box-shadow: 5px 5px 40px #0c0c0c;
		width: 100%;
		height: 100%;
		margin: 20px;
		justify-content: space-between;
	}

	#grid-container {
		display: grid;
		grid-template-columns: 1fr;
		grid-template-rows: 1fr;
		width: 100%;
		height: 100%;
		min-height: calc(100vh - 100px);
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

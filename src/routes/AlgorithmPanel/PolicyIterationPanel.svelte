<script>
	import Slider from '@smui/slider';
	import { PolicyIteration } from '../../algorithms/policy_iteration';
	import { populate_map } from '../../utils/grid_world_utils';
	import {
		replay_history,
		grid_world,
		environment,
		mechanics,
		policy_iteration,
		number_iterations,
		current_frame,
		n_states,
		min_reward,
		max_reward
	} from '../../store/shared_data';

	$: if ($replay_history.length != 0) {
		const extremes = get_extremes($replay_history[$current_frame]);
		$max_reward = Number(extremes.max);
		$min_reward = Number(extremes.min);
		$grid_world = populate_map($environment, $replay_history, $current_frame);
	}

	function get_extremes(history) {
		let max_reward = Number.NEGATIVE_INFINITY;
		let min_reward = Number.POSITIVE_INFINITY;

		for (let state_idx = 0; state_idx < $n_states - 1; state_idx++) {
			const reward = history.state_values[state_idx];
			if (max_reward <= reward) {
				max_reward = reward;
			}
			if (min_reward >= reward) {
				min_reward = reward;
			}
		}
		return {
			min: min_reward,
			max: max_reward
		};
	}

	function run_algorithm() {
		let strategy = new PolicyIteration($environment, $mechanics, $policy_iteration);
		strategy.solve(100);
		replay_history.set(strategy.history);
		$current_frame = strategy.history.length - 1;
		$number_iterations = strategy.n_iterations;
	}
</script>

<div class="canvas">
	<div id="iterations-container">
		<h1 id="iters">Iterations</h1>
		<h1 class="num-iterations">{$number_iterations}</h1>
	</div>
	<div class="txtbox">
		<i class="fa-solid fa-arrows-left-right icon" />
		<input id="n-rows" bind:value={$environment.n_rows} />
	</div>
	<div class="txtbox">
		<i class="fa-solid fa-up-down icon" />
		<input id="n-cols" bind:value={$environment.n_cols} />
	</div>
	<div class="txtbox">
		<span class="status">&gamma;: {$policy_iteration.gamma.toFixed(2)}</span>
		<input
			type="range"
			min="0"
			max="1"
			step="0.001"
			bind:value={$policy_iteration.gamma}
			class="slider"
		/>
	</div>
	<div class="txtbox">
		<span class="status">AC: {$environment.action_cost}</span>
		<input
			type="range"
			min="-10"
			max="10"
			step="0.1"
			bind:value={$environment.action_cost}
			class="slider"
		/>
	</div>
	<div class="txtbox">
		<label id="theta-label" for="theta">&theta;</label>
		<input id="theta" bind:value={$policy_iteration.theta} />
	</div>
	<div id="button-container">
		<button class="start" on:click={run_algorithm}> Start </button>
	</div>
</div>

<style>
	.canvas {
		display: flex;
		flex-direction: column;
		align-items: start;
		justify-content: space-evenly;
		width: 100%;
		height: 100%;
		margin: 0 1em;
	}

	#iterations-container {
		width: 100%;
	}

	#button-container {
		width: 100%;
		align-items: center;
		justify-content: center;
	}

	.start {
		margin: 10px;
		width: 90%;
		height: 40px;
		border-width: 0px;
		border-radius: 10px;
		background-color: #ff5733;
		color: white;
		font-family: 'SF Pro';
		font-size: large;
	}

	.txtbox {
		display: flex;
		flex-direction: row;
		gap: 10px;
	}

	.icon {
		color: white;
		font-size: 2em;
		width: 30px;
	}

	.num-iterations {
		color: white;
		text-align: center;
		font-family: 'SF Pro';
		font-size: 5em;
		align-self: center;
		justify-self: center;
	}

	#iters {
		color: white;
		text-align: center;
		font-family: 'SF Pro';
		font-weight: lighter;
		font-size: 3em;
	}

	#theta,
	#n-rows,
	#n-cols {
		color: white;
		background-color: var(--transparency-color);
		height: 30px;
		width: 200px;
		border-width: 0px;
		border-radius: 10px;
		text-align: center;
		font-size: 1.2em;
	}

	.status {
		color: white;
		font-family: 'SF Pro';
		font-size: 1.2em;
		width: 80px;
		text-align: end;
	}

	#theta-label {
		color: white;
		font-family: 'SF Pro';
		font-size: 2em;
		width: 30px;
	}

	.slider {
		-webkit-appearance: none;
		appearance: none;
		width: 60%;
		height: 25px;
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
		width: 25px;
		height: 25px;
		opacity: 1;
		background: #ffffff;
		cursor: pointer;
	}
</style>

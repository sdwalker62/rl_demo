<script>
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
		console.log($grid_world);
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

<div class="algorithm-controls-canvas">
	<div id="iterations-container">
		<h1 id="iterations-label">Iterations</h1>
		<h1 id="iterations-value">{$number_iterations}</h1>
	</div>
	<div class="input-box-container">
		<i class="fa-solid fa-arrows-left-right icon" />
		<input class="text-box" bind:value={$environment.n_rows} />
	</div>
	<div class="input-box-container">
		<i class="fa-solid fa-up-down icon" />
		<input class="text-box" bind:value={$environment.n_cols} />
	</div>
	<div class="input-box-container">
		<span class="slider-label">&gamma;: {$policy_iteration.gamma.toFixed(2)}</span>
		<input
			type="range"
			min="0"
			max="1"
			step="0.001"
			bind:value={$policy_iteration.gamma}
			class="algorithm-slider"
		/>
	</div>
	<div class="input-box-container">
		<span class="slider-label">AC: {$environment.action_cost}</span>
		<input
			type="range"
			min="-10"
			max="10"
			step="0.1"
			bind:value={$environment.action_cost}
			class="algorithm-slider"
		/>
	</div>
	<div class="input-box-container">
		<label class="text-box-label" for="theta">&theta;</label>
		<input class="text-box" bind:value={$policy_iteration.theta} />
	</div>
	<div class="button-container">
		<button class="run-button" on:click={run_algorithm}> Start </button>
	</div>
</div>

<style>
	#iterations-container {
		width: 100%;
	}

	#iterations-value {
		color: white;
		text-align: center;
		font-family: 'SF Pro';
		font-size: 5em;
		align-self: center;
		justify-self: center;
	}

	#iterations-label {
		color: white;
		text-align: center;
		font-family: 'SF Pro';
		font-weight: lighter;
		font-size: 3em;
	}
</style>

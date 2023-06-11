<script>
	import Slider from '@smui/slider';
	import { PolicyIteration } from '../../algorithms/policy_iteration';
	import {
		replay_history,
		grid_world,
		environment,
		mechanics,
		policy_iteration,
		number_iterations
	} from '../../store/shared_data';

	/**
	 * @param {Object} env
	 */
	export function populate_map(env) {
		const n_states = $environment.n_rows * $environment.n_cols;
		let new_grid_world = Array.from(Array($environment.n_rows), () => Array($environment.n_cols));
		if (env.length != 0) {
			for (let state_idx = 0; state_idx < n_states; state_idx++) {
				const row_idx = Math.floor(state_idx / $environment.n_cols);
				const col_idx = state_idx % $environment.n_cols;
				if ($environment.obstacles.includes(state_idx)) {
					new_grid_world[row_idx][col_idx] = {
						type: 'obstacle'
					};
				} else {
					new_grid_world[row_idx][col_idx] = {
						type: 'standard',
						policy_action: env[env.length - 1].policy[state_idx],
						value: env[env.length - 1].state_values[state_idx]
					};
				}
				new_grid_world = new_grid_world;
			}
			return new_grid_world;
		}
	}

	function run_algorithm() {
		let strategy = new PolicyIteration($environment, $mechanics, $policy_iteration);

		strategy.solve(100);
		replay_history.set(strategy.history);
		$grid_world = populate_map(strategy.history);
		$number_iterations = strategy.n_iterations;
	}
</script>

<div class="canvas">
	<h3 class="alg_title">Policy Iteration</h3>
	<div>
		<h1 id="iters">Iterations</h1>
		<h1 class="num-iterations">{$number_iterations}</h1>
	</div>
	<div>
		<label id="n-rows-label" for="rows">Number of rows</label>
		<input id="n-rows" bind:value={$environment.n_rows} />
	</div>
	<div>
		<label id="n-cols-label" for="n-cols">Number of columns</label>
		<input id="n-cols" bind:value={$environment.n_cols} />
	</div>
	<div>
		<Slider
			bind:value={$policy_iteration.gamma}
			min={0}
			max={1}
			step={0.001}
			input$aria-label="Continuous slider"
		/>
		<pre class="status">Gamma: {$policy_iteration.gamma}</pre>
	</div>
	<div>
		<Slider
			bind:value={$environment.action_cost}
			min={-10}
			max={10}
			step={0.1}
			input$aria-label="Continuous slider"
		/>
		<pre class="status">Action Cost: {$environment.action_cost}</pre>
	</div>
	<div>
		<label id="theta-label" for="theta">Theta</label>
		<input id="theta" bind:value={$policy_iteration.theta} />
	</div>
	<div>
		<button class="start" on:click={run_algorithm}> Start </button>
	</div>
</div>

<style>
	.canvas {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		background: #02006c;
		width: 20%;
		height: 100%;
		margin: 0 1em;
	}

	.alg_title {
		color: white;
		text-align: center;
		font-family: 'SF Pro';
	}

	.start {
		margin: 10px;
		width: 100px;
		height: 40px;
		background-color: #e55934;
		color: white;
		font-family: 'SF Pro';
		font-size: large;
	}

	.num-iterations {
		color: white;
		text-align: center;
		font-family: 'SF Pro';
		font-size: 5em;
	}

	#iters {
		color: white;
		text-align: center;
		font-family: 'SF Pro';
	}

	#n-cols-label,
	#n-rows-label,
	.status,
	#theta-label {
		color: white;
		font-family: 'SF Pro';
	}
</style>

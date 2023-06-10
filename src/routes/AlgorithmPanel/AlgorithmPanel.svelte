<script>
	import Slider from '@smui/slider';
	import { TransitionMatrix } from '../../algorithms/transition_matrix';
	import { PolicyIteration } from '../../algorithms/policy_iteration';
	import {
		replay_history,
		grid_world,
		obstacles,
		n_cols,
		n_rows,
		n_states,
		penalty_tiles,
		goal_tiles,
		n_iterations,
		gamma,
		theta,
		action_cost
	} from '../../store/shared_data';

	/**
	 * @param {Object} env
	 */
	function populate_map(env) {
		let new_grid_world = Array.from(Array($n_rows), () => Array($n_cols));
		if (env.length != 0) {
			for (let state_idx = 0; state_idx < $n_states; state_idx++) {
				const row_idx = Math.floor(state_idx / $n_cols);
				const col_idx = state_idx % $n_cols;
				if ($obstacles.includes(state_idx)) {
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
		const up_probs = {
			up: 0.8,
			right: 0.1,
			down: 0,
			left: 0.1
		};
		const right_probs = {
			up: 0.1,
			right: 0.8,
			down: 0.1,
			left: 0
		};
		const down_probs = {
			up: 0,
			right: 0.1,
			down: 0.8,
			left: 0.1
		};
		const left_probs = {
			up: 0.1,
			right: 0,
			down: 0.1,
			left: 0.8
		};
		$obstacles = [2, 7, 14];
		$penalty_tiles = {
			12: -10
		};
		const n_elements = $n_rows * $n_cols;
		let up_transition_matrix = new TransitionMatrix($n_rows, $n_cols, up_probs, $obstacles);
		let right_transition_matrix = new TransitionMatrix($n_rows, $n_cols, right_probs, $obstacles);
		let down_transition_matrix = new TransitionMatrix($n_rows, $n_cols, down_probs, $obstacles);
		let left_transition_matrix = new TransitionMatrix($n_rows, $n_cols, left_probs, $obstacles);

		let mechanics = {
			up: up_transition_matrix,
			right: right_transition_matrix,
			down: down_transition_matrix,
			left: left_transition_matrix
		};

		const initial_value = 0;
		const initial_action = 'up';
		const terminal_states = [24];
		$goal_tiles = {
			24: 100,
			1: 100,
			68: 100
		};

		let strategy = new PolicyIteration(
			n_elements,
			mechanics,
			$gamma,
			$theta,
			initial_value,
			initial_action,
			terminal_states,
			$goal_tiles,
			$penalty_tiles,
			$action_cost
		);

		strategy.solve(100);
		replay_history.set(strategy.history);
		$grid_world = populate_map(strategy.history);
		$n_iterations = strategy.n_iterations;
	}
</script>

<div class="canvas">
	<h3 class="alg_title">Policy Iteration</h3>
	<div>
		<h1 id="iters">Iterations</h1>
		<h1 class="num-iterations">{$n_iterations}</h1>
	</div>
	<div>
		<label id="n-rows-label" for="rows">Number of rows</label>
		<input id="n-rows" bind:value={$n_rows} />
	</div>
	<div>
		<label id="n-cols-label" for="n-cols">Number of columns</label>
		<input id="n-cols" bind:value={$n_cols} />
	</div>
	<div>
		<Slider bind:value={$gamma} min={0} max={1} step={0.001} input$aria-label="Continuous slider" />
		<pre class="status">Gamma: {$gamma}</pre>
	</div>
	<div>
		<Slider
			bind:value={$action_cost}
			min={-10}
			max={10}
			step={0.1}
			input$aria-label="Continuous slider"
		/>
		<pre class="status">Action Cost: {$action_cost}</pre>
	</div>
	<div>
		<label id="theta-label" for="theta">Theta</label>
		<input id="theta" bind:value={$theta} />
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

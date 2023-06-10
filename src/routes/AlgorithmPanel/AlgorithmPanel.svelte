<script>
	import { TransitionMatrix } from '../../algorithms/transition_matrix';
	import { PolicyIteration } from '../../algorithms/policy_iteration';
	import {
		replay_history,
		grid_world,
		obstacles,
		n_cols,
		n_rows,
		n_states
	} from '../../store/shared_data';

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
		const obstacles = [2];
		const n_rows = 5;
		const n_cols = 5;
		const n_elements = n_rows * n_cols;
		let up_transition_matrix = new TransitionMatrix(n_rows, n_cols, up_probs, obstacles);
		let right_transition_matrix = new TransitionMatrix(n_rows, n_cols, right_probs, obstacles);
		let down_transition_matrix = new TransitionMatrix(n_rows, n_cols, down_probs, obstacles);
		let left_transition_matrix = new TransitionMatrix(n_rows, n_cols, left_probs, obstacles);

		let mechanics = {
			up: up_transition_matrix,
			right: right_transition_matrix,
			down: down_transition_matrix,
			left: left_transition_matrix
		};

		const gamma = 0.9;
		const theta = 0.001;
		const initial_value = 0;
		const initial_action = 'up';
		const terminal_states = [25];
		const goal_states = {
			24: {
				reward: 100
			}
		};
		const penalty_states = {
			7: {
				reward: -100
			}
		};

		const action_cost = -1;

		let strategy = new PolicyIteration(
			n_elements,
			mechanics,
			gamma,
			theta,
			initial_value,
			initial_action,
			terminal_states,
			goal_states,
			penalty_states,
			action_cost
		);

		strategy.solve(100);
		replay_history.set(strategy.history);
		$grid_world = populate_map(strategy.history);
	}
</script>

<div class="canvas">
	<h3 class="alg_title">Policy Iteration</h3>
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
</style>

<script>
	import { TransitionMatrix } from '../../algorithms/transition_matrix';
	import { PolicyIteration } from '../../algorithms/policy_iteration';

	function createMatrix() {
		const n_states = 3;
		const n_elements = 9;
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
		const n_rows = 4;
		const n_cols = 5;
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
		const terminal_states = [5];
		const goal_states = {
			5: {
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
		console.log(strategy.state_values);
	}
</script>

<button on:click={createMatrix}> Build Matrix </button>

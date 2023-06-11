import { writable, derived } from 'svelte/store';
import { TransitionMatrix } from '../algorithms/transition_matrix';

export let colorMode = writable('dark');
export let replay_history = writable([]);

export let grid_world = writable(
	Array.from(Array(5), () =>
		Array(5).fill({
			type: 'standard',
			policy_action: 'up',
			value: 0
		})
	)
);

export let max_value = writable(100);
export let min_value = writable(-100);
export let number_iterations = writable(0);
export let lag = writable(10000);

export let environment = writable({
	n_cols: 5,
	n_rows: 5,
	action_cost: -1,
	obstacles: [],
	penalty_states: {},
	goal_states: {},
	initial_action: 0,
	initial_value: 0,
	terminal_states: [],
	initial_state: 0
});

// ======================================================================
// Algorithm Specific Parameters
// ======================================================================

export let policy_iteration = writable({
	gamma: 0.9,
	theta: 0.001,
	max_iterations: 100
});

export let q_learning = writable({
	epsilon: 0.15,
	gamma: 0.9,
	alpha: 0.1,
	theta: 0.001,
	max_iterations: 100
});

// ======================================================================
// Transition Mechanics (there needs to be a way to add this dynamically)
// ======================================================================
export let up_probs = writable({
	up: 0.8,
	right: 0.1,
	down: 0,
	left: 0.1
});
export let right_probs = writable({
	up: 0.1,
	right: 0.8,
	down: 0.1,
	left: 0
});
export let down_probs = writable({
	up: 0,
	right: 0.1,
	down: 0.8,
	left: 0.1
});
export let left_probs = writable({
	up: 0.1,
	right: 0,
	down: 0.1,
	left: 0.8
});

export let up_transition_matrix = derived([up_probs, environment], ([$up_probs, $environment]) => {
	return new TransitionMatrix(
		$environment.n_rows,
		$environment.n_cols,
		$up_probs,
		$environment.obstacles
	);
});

export let right_transition_matrix = derived(
	[right_probs, environment],
	([$right_probs, $environment]) => {
		return new TransitionMatrix(
			$environment.n_rows,
			$environment.n_cols,
			$right_probs,
			$environment.obstacles
		);
	}
);

export let down_transition_matrix = derived(
	[down_probs, environment],
	([$down_probs, $environment]) => {
		return new TransitionMatrix(
			$environment.n_rows,
			$environment.n_cols,
			$down_probs,
			$environment.obstacles
		);
	}
);

export let left_transition_matrix = derived(
	[left_probs, environment],
	([$left_probs, $environment]) => {
		return new TransitionMatrix(
			$environment.n_rows,
			$environment.n_cols,
			$left_probs,
			$environment.obstacles
		);
	}
);

export let mechanics = derived(
	[up_transition_matrix, right_transition_matrix, down_transition_matrix, left_transition_matrix],
	([
		$up_transition_matrix,
		$right_transition_matrix,
		$down_transition_matrix,
		$left_transition_matrix
	]) => {
		return {
			0: $up_transition_matrix,
			1: $right_transition_matrix,
			2: $down_transition_matrix,
			3: $left_transition_matrix
		};
	}
);

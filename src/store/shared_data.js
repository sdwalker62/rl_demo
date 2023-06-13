import { writable, derived } from 'svelte/store';
import { TransitionMatrix } from '../algorithms/transition_matrix';

export let current_page = writable('home');

export let colorMode = writable('dark');
export let replay_history = writable([]);
export let current_frame = writable(0);

export let max_reward = writable(0);
export let min_reward = writable(0);

export let number_iterations = writable(0);
export let lag = writable(100);

export let environment = writable({
	n_cols: 10,
	n_rows: 10,
	action_cost: -1,
	obstacles: [2, 7, 14],
	penalty_states: {
		12: 0
	},
	goal_states: {
		24: 400,
		8: 100
	},
	initial_action: 0,
	initial_value: 0,
	initial_state: 0,
	terminal_states: [24, 8]
});

export let grid_world = writable(
	Array(100).fill({
		type: 'standard',
		policy_action: 0,
		value: 0
	})
);

export let n_states = derived([environment], ([$environment]) => {
	return $environment.n_cols * $environment.n_rows;
});

// export let grid_world = derived([environment], ([$environment]) => {
// 	return 	Array($environment.n_cols * $environment.n_rows).fill({
// 		type: 'standard',
// 		policy_action: 0,
// 		value: 0
// 	})
// })

// export let max_reward = derived([environment], ([$environment]) => {
// 	let max_value = -100000;
// 	for (const goal_state in Object.keys($environment.goal_states)) {
// 		const state_value = $environment.goal_states[goal_state];
// 		if ($environment.goal_states[goal_state] > max_value) {
// 			max_value = state_value;
// 		}
// 	}
// 	return max_value;
// });

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
	max_steps_per_episode: 1000,
	num_episodes: 1000,
	render_idx_step: 20
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

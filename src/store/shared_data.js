import { writable, derived } from 'svelte/store';

export let colorMode = writable('dark');
export let n_cols = writable(0);
export let n_rows = writable(0);
export let n_states = derived([n_cols, n_rows], ([$n_cols, $n_rows]) => {
	return $n_cols * $n_rows;
});
export let max_iterations = writable(0);
export let replay_history = writable([]);
export let obstacles = writable([]);
export let goal_tiles = writable({});
export let penalty_tiles = writable({});

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
export let n_iterations = writable(0);
export let gamma = writable(0.9);
export let theta = writable(0.001);
export let action_cost = writable(-1);

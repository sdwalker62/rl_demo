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
export let goals = writable([]);

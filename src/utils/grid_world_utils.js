/**
 * @param {Object} environment - Gridworld information
 * @param {Object} history - history from the policy run
 */
export function populate_map(environment, history) {
	const nc = environment.n_cols;
	const nr = environment.n_rows;
	const n_states = nr * nc;
	let new_grid_world = Array.from(Array(nr), () => Array(nc));
	if (history.length != 0) {
		for (let state_idx = 0; state_idx < n_states; state_idx++) {
			const row_idx = Math.floor(state_idx / nc);
			const col_idx = state_idx % nc;
			if (environment.obstacles.includes(state_idx)) {
				new_grid_world[row_idx][col_idx] = {
					type: 'obstacle'
				};
			} else {
				new_grid_world[row_idx][col_idx] = {
					type: 'standard',
					policy_action: history[history.length - 1].policy[state_idx],
					value: history[history.length - 1].state_values[state_idx]
				};
			}
		}
		return new_grid_world;
	}
}

/**
 * @param {Object} environment - Gridworld information
 * @param {Object} history - history from the policy run
 */
export function render_board(environment, history) {
	const nc = environment.n_cols;
	const nr = environment.n_rows;
	const n_states = nr * nc;
	let new_grid_world = Array.from(Array(nr), () => Array(nc));
	if (history.length != 0) {
		for (let state_idx = 0; state_idx < n_states; state_idx++) {
			const row_idx = Math.floor(state_idx / nc);
			const col_idx = state_idx % nc;
			if (environment.obstacles.includes(state_idx)) {
				new_grid_world[row_idx][col_idx] = {
					type: 'obstacle'
				};
			} else if (Object.keys(environment.goal_states).includes(String(state_idx))) {
				new_grid_world[row_idx][col_idx] = {
					type: 'goal'
				};
			} else if (Number(history.player_state) === state_idx) {
				new_grid_world[row_idx][col_idx] = {
					type: 'player'
				};
			} else {
				new_grid_world[row_idx][col_idx] = {
					type: 'standard',
					policy_action: 'up',
					value: history.values[state_idx]
				};
			}
		}
		return new_grid_world;
	}
}

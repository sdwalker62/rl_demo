/**
 * @param {Object} environment - Gridworld information
 * @param {Object} history - history from the policy run
 */
export function populate_map(environment, history, frame_idx) {
	const nc = Number(environment.n_cols);
	const nr = Number(environment.n_rows);
	const n_states = nr * nc;
	let new_grid_world = Array(n_states);
	if (history.length != 0) {
		for (let state_idx = 0; state_idx < n_states; state_idx++) {
			if (environment.obstacles.includes(state_idx)) {
				new_grid_world[state_idx] = {
					type: 'obstacle'
				};
			} else if (Object.keys(environment.goal_states).includes(String(state_idx))) {
				new_grid_world[state_idx] = {
					type: 'goal'
				};
			} else {
				new_grid_world[state_idx] = {
					type: 'standard',
					policy_action: history[frame_idx].policy[state_idx],
					value: history[frame_idx].state_values[state_idx]
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
	const nc = Number(environment.n_cols);
	const nr = Number(environment.n_rows);
	const n_states = nr * nc;
	let new_grid_world = Array(n_states);
	if (history.length != 0) {
		for (let state_idx = 0; state_idx < n_states; state_idx++) {
			if (environment.obstacles.includes(state_idx)) {
				new_grid_world[state_idx] = {
					type: 'obstacle'
				};
			} else if (Object.keys(environment.goal_states).includes(String(state_idx))) {
				new_grid_world[state_idx] = {
					type: 'goal'
				};
			} else if (Number(history.player_state) === state_idx) {
				new_grid_world[state_idx] = {
					type: 'player'
				};
			} else {
				new_grid_world[state_idx] = {
					type: 'standard',
					policy_action: history.actions[state_idx],
					value: history.values[state_idx]
				};
			}
		}
		return new_grid_world;
	}
}

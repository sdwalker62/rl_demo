import _ from 'lodash';

export class TransitionMatrix {
	/**
	 * @param {number} n_states
	 * @param {Object} probabilities
	 * @param {Array<number>} obstacles
	 */
	constructor(n_states, probabilities, obstacles) {
		this.n_states = n_states;
		this.n_elements = n_states * n_states;

		let state_matrix = Array.from(Array(this.n_elements), (_) => Array(this.n_elements).fill(0));
		this.matrix = this.uniform_populate_state_matrix(
			state_matrix,
			probabilities.up,
			probabilities.right,
			probabilities.down,
			probabilities.left,
			obstacles
		);
	}

	/**
	 * Retrieves the column given the state index
	 * Example:
	 *
	 * 0 1 2
	 * 3 4 5
	 * 6 7 8
	 *
	 * 3 mod 3 = 0
	 * 7 mod 3 = 1
	 * 8 mod 3 = 2
	 *
	 * get_col_idx(3) => 0
	 * get_col_idx(7) => 1
	 * get_col_idx(8) => 2
	 *
	 * @param {number} state
	 * @returns the column of the state (zero index)
	 */
	get_col_idx(state) {
		return state % this.n_states;
	}

	/**
	 *
	 * @param {number} state
	 * @returns the row of the state (zero index)
	 */
	get_row_idx(state) {
		if (state === 0) return 0;
		else return _.floor(state / this.n_states);
	}

	/**
	 *
	 * @param {number} current_state
	 * @param {number} candidate_state
	 * @returns
	 */
	check_adjacency(current_state, candidate_state) {
		const current_state_row = this.get_row_idx(current_state);
		const current_state_col = this.get_col_idx(current_state);
		const candidate_state_row = this.get_row_idx(candidate_state);
		const candidate_state_col = this.get_col_idx(candidate_state);

		const row_delta = candidate_state_row - current_state_row;
		const col_delta = candidate_state_col - current_state_col;
		// console.log({
		// 	state: current_state,
		// 	candidate: candidate_state,
		// 	row_delta: row_delta,
		// 	col_delta: col_delta
		// });

		if (row_delta === -1 && col_delta === 0) return { adj: true, dir: 'up' };
		else if (row_delta === 0 && col_delta === 1) return { adj: true, dir: 'right' };
		else if (row_delta === 1 && col_delta === 0) return { adj: true, dir: 'down' };
		else if (row_delta === 0 && col_delta === -1) return { adj: true, dir: 'left' };
		else return { adj: false, dir: 'none' };
	}

	/**
	 *
	 * @param {Array<Array<number>>} state_matrix
	 * @param {number} up_prob
	 * @param {number} right_prob
	 * @param {number} down_prob
	 * @param {number} left_prob
	 * @returns
	 */
	uniform_populate_state_matrix(
		state_matrix,
		up_prob,
		right_prob,
		down_prob,
		left_prob,
		obstacles
	) {
		for (let state_idx = 0; state_idx < this.n_elements; state_idx++) {
			if (_.indexOf(obstacles, state_idx) === -1) {
				for (let c_state_idx = 0; c_state_idx < this.n_elements; c_state_idx++) {
					let adj_info = this.check_adjacency(state_idx, c_state_idx);
					if (_.indexOf(obstacles, c_state_idx) === -1) {
						if (adj_info.adj) {
							if (adj_info.dir === 'up') state_matrix[state_idx][c_state_idx] = up_prob;
							else if (adj_info.dir === 'right') state_matrix[state_idx][c_state_idx] = right_prob;
							else if (adj_info.dir === 'down') state_matrix[state_idx][c_state_idx] = down_prob;
							else state_matrix[state_idx][c_state_idx] = left_prob;
						}
					} else {
						// collision with an obstacle state
						if (adj_info.dir === 'up') state_matrix[state_idx][state_idx] += up_prob;
						else if (adj_info.dir === 'right') state_matrix[state_idx][state_idx] += right_prob;
						else if (adj_info.dir === 'down') state_matrix[state_idx][state_idx] += down_prob;
						else state_matrix[state_idx][state_idx] += left_prob;
					}
				}
			}
			// Collision logic
			// 1. Check for first row collisions
			if (this.get_row_idx(state_idx) === 0) {
				state_matrix[state_idx][state_idx] += up_prob;
			}

			// 2. Check for first column collisions
			if (this.get_col_idx(state_idx) === 0) {
				state_matrix[state_idx][state_idx] += left_prob;
			}

			// 3. Check for last row collisions
			if (this.get_row_idx(state_idx) === this.n_states - 1) {
				state_matrix[state_idx][state_idx] += down_prob;
			}

			// 4. Check for last column collisions
			if (this.get_col_idx(state_idx) === this.n_states - 1) {
				state_matrix[state_idx][state_idx] += right_prob;
			}
		}
		return state_matrix;
	}
}

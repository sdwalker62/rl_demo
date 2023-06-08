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
		let flat_state_matrix = _.fill(Array(this.n_elements), 0);
		let state_matrix = _.partition(flat_state_matrix, (n) => n % n_states);
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
	 *
	 * @param {number} state
	 * @returns the column of the state (zero index)
	 */
	get_col_idx(state) {
		return this.n_elements % state;
	}

	/**
	 *
	 * @param {number} state
	 * @returns the row of the state (zero index)
	 */
	get_row_idx(state) {
		return _.floor(state / this.n_states);
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

		const row_delta = current_state_row - candidate_state_row;
		const col_delta = current_state_col - candidate_state_col;

		if (row_delta === 1 && col_delta === 0) return { adj: true, dir: 'up' };
		else if (row_delta === 0 && col_delta === -1) return { adj: true, dir: 'right' };
		else if (row_delta === -1 && col_delta === 0) return { adj: true, dir: 'down' };
		else if (row_delta === 0 && col_delta === 1) return { adj: true, dir: 'left' };
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
		for (let state_idx = 0; state_idx < this.n_states + 1; state_idx++) {
			for (let c_state_idx = 0; c_state_idx < this.n_states + 1; c_state_idx++) {
				if (_.indexOf(obstacles, c_state_idx) === -1) {
					const adj_info = this.check_adjacency(state_idx, c_state_idx);
					if (adj_info.adj) {
						if (adj_info.dir === 'up') state_matrix[state_idx][c_state_idx] = up_prob;
						else if (adj_info.dir === 'right') state_matrix[state_idx][c_state_idx] = right_prob;
						else if (adj_info.dir === 'down') state_matrix[state_idx][c_state_idx] = down_prob;
						else state_matrix[state_idx][c_state_idx] = left_prob;
					}
				}
			}
		}
		return state_matrix;
	}
}

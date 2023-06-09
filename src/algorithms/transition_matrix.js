import _ from 'lodash';

export class TransitionMatrix {
	/**
	 * @param {number} n_rows
	 * @param {number} n_cols
	 * @param {Object} probabilities
	 * @param {Array<number>} obstacles
	 */
	constructor(n_rows, n_cols, probabilities, obstacles) {
		this.n_states = n_rows * n_cols;
		this.n_rows = n_rows;
		this.n_cols = n_cols;
		this.n_elements = this.n_states ** 2;
		this.verbose = false;

		let state_matrix = Array.from(Array(this.n_states), (_) => Array(this.n_states).fill(0));
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
	 * 00 01 02 03
	 * 04 05 06 07
	 * 08 09 10 11
	 *
	 * state_id mod n_cols
	 * 0 mod 4 = 0
	 * 5 mod 4 = 1
	 * 10 mod 4 = 2
	 *
	 * get_col_idx(0) => 0
	 * get_col_idx(5) => 1
	 * get_col_idx(10) => 2
	 *
	 * @param {number} state
	 * @returns the column of the state (zero index)
	 */
	get_col_idx(state) {
		if (state === 0) return 0;
		else return state % this.n_cols;
	}

	/**
	 *
	 * @param {number} state
	 * @returns the row of the state (zero index)
	 */
	get_row_idx(state) {
		if (state === 0) return 0;
		else return _.floor(state / this.n_cols);
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

		if (this.verbose)
			console.log({
				state: current_state,
				candidate: candidate_state,
				row_delta: row_delta,
				col_delta: col_delta
			});

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
	 * @param {Array<number>} obstacles
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
		for (let state_idx = 0; state_idx < this.n_states; state_idx++) {
			if (_.indexOf(obstacles, state_idx) === -1) {
				for (let c_state_idx = 0; c_state_idx < this.n_states; c_state_idx++) {
					let adj_info = this.check_adjacency(state_idx, c_state_idx);
					if (adj_info.adj) {
						if (_.indexOf(obstacles, c_state_idx) === -1) {
							if (adj_info.dir === 'up') state_matrix[state_idx][c_state_idx] = up_prob;
							else if (adj_info.dir === 'right') state_matrix[state_idx][c_state_idx] = right_prob;
							else if (adj_info.dir === 'down') state_matrix[state_idx][c_state_idx] = down_prob;
							else state_matrix[state_idx][c_state_idx] = left_prob;
						} else {
							// collision with an obstacle state
							if (adj_info.dir === 'up') state_matrix[state_idx][state_idx] += up_prob;
							else if (adj_info.dir === 'right') state_matrix[state_idx][state_idx] += right_prob;
							else if (adj_info.dir === 'down') state_matrix[state_idx][state_idx] += down_prob;
							else if (adj_info.dir === 'left') state_matrix[state_idx][state_idx] += left_prob;
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
				if (this.get_row_idx(state_idx) === this.n_rows - 1) {
					state_matrix[state_idx][state_idx] += down_prob;
				}

				// 4. Check for last column collisions
				if (this.get_col_idx(state_idx) === this.n_cols - 1) {
					state_matrix[state_idx][state_idx] += right_prob;
				}

				// verify that this row is a valid probability distribution
				let sum = _.sum(state_matrix[state_idx]);
				if (sum != 1) {
					throw new Error(
						`State ${state_idx} has an improper action probability distribution! Sum equals ${sum}. Row is ${state_matrix[state_idx]}.`
					);
				}
			}
		}

		return state_matrix;
	}
}

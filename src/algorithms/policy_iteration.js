import _ from 'lodash';

/**
 * Class containing logic for Policy Iteration. Will eventually extend the Strategy class.
 * Find more information from Sutton and Barto or
 * https://www.cs.cmu.edu/afs/cs/project/jair/pub/volume4/kaelbling96a-html/node20.html#:~:text=The%20policy%20iteration%20algorithm%20manipulates,solve%20the%20linear%20equations
 */
export class PolicyIteration {
	/**
	 * @param {Object} environment - JSON containing information from the env
	 * 	contains information such as:
	 * 		- number of states
	 * 		- goal states
	 * 		- initial states
	 * 		etc.
	 *
	 * @param {Object} mechanics - JSON containing action transition probability matrices
	 * @param {Object} algorithm_paramaters - policy iteration specific hyper-parameters
	 */
	constructor(environment, mechanics, algorithm_paramaters) {
		this.mechanics = mechanics;
		this.gamma = algorithm_paramaters.gamma;
		this.theta = algorithm_paramaters.theta;
		this.n_states = environment.n_rows * environment.n_cols;
		this.goal_states = environment.goal_tiles;
		this.penalty_states = environment.penalty_tiles;
		this.state_values = Array(this.n_states).fill(environment.initial_value);
		this.policy = Array(this.n_states).fill(environment.initial_action);
		this.action_cost = environment.action_cost;
		this.initial_action = environment.initial_action;
		for (const terminal_state of environment.terminal_states) {
			this.state_values[terminal_state] = 0;
		}
		this.history = [];
		this.n_iterations = 0;
	}

	/**
	 *
	 * @param {number} state - index of state in the state array
	 * @returns the utility of transitioning to this state
	 */
	get_reward(state) {
		if (state in this.goal_states) {
			return this.goal_states[state];
		} else if (state in this.penalty_states) {
			return this.penalty_states[state];
		} else {
			return this.action_cost;
		}
	}

	/**
	 *
	 * @param {number} max_iterations - cap the total number of iterations to stop run away loops
	 */
	policy_evaluation(max_iterations) {
		for (let eval_iter = 0; eval_iter < max_iterations; eval_iter++) {
			let delta = 0;
			for (let state_idx = 0; state_idx < this.n_states; state_idx++) {
				if (_.indexOf(Object.keys(this.goal_states), String(state_idx)) === -1) {
					let temp_v = this.state_values[state_idx];
					let probability_matrix;
					switch (this.policy[state_idx]) {
						case 'up':
							probability_matrix = this.mechanics.up.matrix;
							break;
						case 'right':
							probability_matrix = this.mechanics.right.matrix;
							break;
						case 'down':
							probability_matrix = this.mechanics.down.matrix;
							break;
						case 'left':
							probability_matrix = this.mechanics.left.matrix;
							break;
					}
					let new_state_value = 0;
					for (let c_state_idx = 0; c_state_idx < this.n_states; c_state_idx++) {
						const potential_reward =
							this.get_reward(c_state_idx) + this.gamma * this.state_values[c_state_idx];
						new_state_value += probability_matrix[state_idx][c_state_idx] * potential_reward;
					}
					this.state_values[state_idx] = new_state_value;
					const state_delta = Math.abs(temp_v - new_state_value);
					delta = _.max([delta, state_delta]);
				}
			}
			if (delta < this.theta) {
				break;
			}
		}
	}

	/**
	 *
	 * @param {number} max_iterations - cap the total number of iterations to stop run away loops
	 */
	solve(max_iterations) {
		for (let iterations = 0; iterations < max_iterations; iterations++) {
			let policy_stable = true;
			for (let state_idx = 0; state_idx < this.n_states; state_idx++) {
				let old_action = this.policy[state_idx];
				let best_action = this.initial_action;
				let max_action_value = -1;
				for (const action of Object.keys(this.mechanics)) {
					let probability_matrix = this.mechanics[action].matrix;
					let action_value = 0;
					for (let c_state_idx = 0; c_state_idx < this.n_states; c_state_idx++) {
						const potential_reward =
							this.get_reward(c_state_idx) + this.gamma * this.state_values[c_state_idx];
						action_value += probability_matrix[state_idx][c_state_idx] * potential_reward;
					}
					if (action_value > max_action_value) {
						best_action = action;
						max_action_value = action_value;
					}
				}
				this.policy[state_idx] = best_action;
				if (best_action != old_action) {
					policy_stable = false;
				}
			}
			const history_frame = {
				state_values: Object.assign({}, this.state_values),
				policy: Object.assign({}, this.policy)
			};
			this.history.push(history_frame);
			if (!policy_stable) {
				this.policy_evaluation(max_iterations);
			} else {
				this.n_iterations = iterations;
				break;
			}
		}
	}
}

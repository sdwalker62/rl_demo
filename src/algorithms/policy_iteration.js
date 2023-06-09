import { TransitionMatrix } from './transition_matrix';
import _ from 'lodash';

/**
 * Class containing logic for Policy Iteration. Will eventually extend the Strategy class.
 * Find more information from Sutton and Barto or
 * https://www.cs.cmu.edu/afs/cs/project/jair/pub/volume4/kaelbling96a-html/node20.html#:~:text=The%20policy%20iteration%20algorithm%20manipulates,solve%20the%20linear%20equations
 */
export class PolicyIteration {
	/**
	 *
	 * @param {number} n_states - Total number of system states
	 * @param {Object} mechanics - The transition mechanics for this environment
	 * @param {number} gamma - Learning rate
	 * @param {number} theta - The convergence threshold
	 * @param {number} initial_value - The state-value functions initial value
	 * @param {string} initial_action - The policies default action
	 * @param {Array<number>} terminal_states - Set of states that terminate the environment upon transition
	 * @param {Array<Object>} goal_states -  A set of states with positive reward
	 * @param {Array<Object>} penalty_states - A set of states with negative reward
	 * @param {number} action_cost - traversal utility cost
	 */
	constructor(
		n_states,
		mechanics,
		gamma,
		theta,
		initial_value,
		initial_action,
		terminal_states,
		goal_states,
		penalty_states,
		action_cost
	) {
		this.mechanics = mechanics;
		this.gamma = gamma;
		this.theta = theta;
		this.n_states = n_states;
		this.goal_states = goal_states;
		this.penalty_states = penalty_states;
		this.state_values = Array(n_states).fill(initial_value);
		this.policy = Array(n_states).fill(initial_action);
		this.action_cost = action_cost;
		this.initial_action = initial_action;
		for (const terminal_state of terminal_states) {
			this.state_values[terminal_state] = 0;
		}
		this.history = [];
	}

	/**
	 *
	 * @param {number} state - index of state in the state array
	 * @returns the utility of transitioning to this state
	 */
	get_reward(state) {
		if (_.indexOf(Object.keys(this.goal_states), String(state)) != -1) {
			return 100;
		} else if (_.indexOf(Object.keys(this.penalty_states), String(state)) != -1) {
			return -100;
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
				break;
			}
		}
	}
}

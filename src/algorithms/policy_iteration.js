import { TransitionMatrix } from './transition_matrix';
import _ from 'lodash';

export class PolicyIteration {
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
	}

	get_reward(state) {
		if (_.indexOf(Object.keys(this.goal_states), String(state)) != -1) {
			return 100;
		} else if (_.indexOf(Object.keys(this.penalty_states), String(state)) != -1) {
			return -100;
		} else {
			return this.action_cost;
		}
	}

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

	solve(max_iterations) {
		for (let iterations = 0; iterations < max_iterations; iterations++) {
			console.log('iterating!');
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
			console.log(policy_stable);
			if (!policy_stable) {
				this.policy_evaluation(max_iterations);
			} else {
				break;
			}
		}
	}
}

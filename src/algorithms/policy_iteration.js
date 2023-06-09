import { transformWithEsbuild } from 'vite';
import { TransitionMatrix } from './transition_matrix';
import _ from 'lodash';

export class PolicyIteration {
	constructor(
		n_states,
		mechanics,
		gamma,
		theta,
		initial_value,
		max_eval_iters,
		initial_action,
		terminal_states,
		goal_states,
		penalty_states,
		action_cost
	) {
		this.mechanics = mechanics;
		this.gamma = gamma;
		this.theta = theta;
		this.max_eval_iters = max_eval_iters;
		this.n_states = n_states;
		this.goal_states = goal_states;
		this.penalty_states = penalty_states;
		this.state_values = Array(n_states).fill(initial_value);
		this.policy = Array(n_states).fill(initial_action);
		this.action_cost = action_cost;
		for (const terminal_state of terminal_states) {
			this.state_values[terminal_state] = 0;
		}
	}

	get_reward(state) {
		if (_.indexOf(Object.keys(this.goal_states), state) != -1) {
			return state.reward;
		} else if (_.indexOf(Object.keys(this.penalty_states), state) != -1) {
			return state.reward;
		} else {
			return this.action_cost;
		}
	}

	policy_evaluation() {
		for (let eval_iter = 0; eval_iter < this.max_eval_iters; eval_iter++) {
			let delta = 0;
			for (let state_idx = 0; state_idx < this.n_states; state_idx++) {
				let temp_v = this.state_values[state_idx];
				let probability_matrix;
				switch (this.policy[state_idx]) {
					case 'up':
						probability_matrix = this.mechanics.up[state_idx];
						break;
					case 'right':
						probability_matrix = this.mechanics.right[state_idx];
						break;
					case 'down':
						probability_matrix = this.mechanics.down[state_idx];
						break;
					case 'left':
						probability_matrix = this.mechanics.left[state_idx];
						break;
				}
				let new_state_value = 0;
				for (let c_state_idx = 0; c_state_idx < this.n_states; c_state_idx++) {
					const potential_reward =
						this.get_reward(c_state_idx) + this.gamma * this.state_values[c_state_idx];
					new_state_value += probability_matrix[c_state_idx] * potential_reward;
				}
				this.state_values[state_idx] = new_state_value;
				const state_delta = Math.abs(temp_v - new_state_value);
				delta = _.max([delta, state_delta]);
			}
			if (delta < this.theta) {
				break;
			}
		}
	}
}

// import _ from 'lodash';
import { Course } from './course';

/**
 * Class containing logic for Policy Iteration. Will eventually extend the Strategy class.
 * Find more information from Sutton and Barto or
 * https://www.cs.cmu.edu/afs/cs/project/jair/pub/volume4/kaelbling96a-html/node20.html#:~:text=The%20policy%20iteration%20algorithm%20manipulates,solve%20the%20linear%20equations
 */
export class QLearning {
	/**
	 * @param {Object} environment - JSON containing information from the env
	 * 	contains information such as:
	 * 		- number of states
	 * 		- goal states
	 * 		- initial states
	 * 		etc.
	 *
	 * @param {Object} mechanics - JSON containing action transition probability matrices
	 * @param {Object} hyperparameters - policy iteration specific hyper-parameters
	 */
	constructor(environment, mechanics, hyperparameters) {
		this.mechanics = mechanics;
		this.gamma = hyperparameters.gamma;
		this.epsilon = hyperparameters.epsilon;
		this.theta = hyperparameters.theta;
		this.alpha = hyperparameters.alpha;
		this.n_states = environment.n_rows * environment.n_cols;
		this.goal_states = environment.goal_states;
		this.penalty_states = environment.penalty_states;
		this.state_values = Array(this.n_states).fill(environment.initial_value);
		this.policy = Array(this.n_states).fill(environment.initial_action);
		this.action_cost = environment.action_cost;
		this.initial_action = environment.initial_action;
		for (const terminal_state of environment.terminal_states) {
			this.state_values[terminal_state] = 0;
		}
		this.history = [];
		this.n_iterations = 0;
		this.initial_state = environment.initial_state;
		this.course = new Course(environment, mechanics, hyperparameters);

		this.state_action_values = {};

		for (let i = 0; i < this.n_states; i++) {
			this.state_action_values[i] = {
				up: 0,
				right: 0,
				down: 0,
				left: 0
			};
		}
	}

	// /**
	//  *
	//  * @param {number} state - index of state in the state array
	//  * @returns the utility of transitioning to this state
	//  */
	// get_reward(state) {
	// 	if (state in this.goal_states) {
	// 		return this.goal_states[state];
	// 	} else if (state in this.penalty_states) {
	// 		return this.penalty_states[state];
	// 	} else {
	// 		return this.action_cost;
	// 	}
	// }

	random_choice(probability_array) {
		var i,
			sum = 0,
			r = Math.random();
		for (i in probability_array) {
			sum += probability_array[i];
			if (r <= sum) return i;
		}
	}

	get_random_action() {
		const num_actions = Object.keys(this.mechanics).length;
		const probability_array = new Array(num_actions).fill(1 / num_actions);
		return this.random_choice(probability_array);
	}

	convert_action_from_numeric_to_string(action) {
		switch (action) {
			case '0':
				action = 'up';
				break;
			case '1':
				action = 'right';
				break;
			case '2':
				action = 'down';
				break;
			case '3':
				action = 'left';
				break;
		}
		return action;
	}

	get_next_action(state) {
		// Check for random exploration
		const randomly_explore_probabilities = [1 - this.epsilon, this.epsilon];
		const randomly_explore = this.random_choice(randomly_explore_probabilities);
		if (randomly_explore === '1') {
			return this.convert_action_from_numeric_to_string(this.get_random_action());
		} else {
			const current_state_action_values = this.state_action_values[state];
			let max_state_action_value = 0;
			let best_action = 'up';
			for (const action_idx in Object.keys(current_state_action_values)) {
				let action = this.convert_action_from_numeric_to_string(action_idx);
				if (current_state_action_values[action] >= max_state_action_value) {
					best_action = action;
					max_state_action_value = current_state_action_values[action];
				}
			}
			return best_action;
		}
	}

	run_episode(max_steps) {
		let state = this.initial_state;
		let action = this.get_next_action(state);
		let reward;
		let history = [];
		let next_state;
		for (let step_n = 0; step_n < max_steps; step_n++) {
			history.push({
				state: state,
				Q: Object.assign({}, this.state_action_values)
			});
			const step_information = this.course.step(state, action);
			reward = step_information.reward;
			next_state = step_information.next_state;
			if (next_state in this.goal_states) {
				break;
			}
			let next_action = this.get_next_action(next_state);
			let Q_orig = this.state_action_values[state][action];
			let Q_prime = this.state_action_values[next_state][next_action];
			this.state_action_values[state][action] =
				Q_orig + this.alpha * (reward + this.gamma * Q_prime - Q_orig);
			state = next_state;
			action = next_action;
		}
		return history;
	}
}

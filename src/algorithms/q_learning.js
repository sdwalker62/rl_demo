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
				0: 0,
				1: 0,
				2: 0,
				3: 0
			};
		}
	}

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

	get_next_action(state) {
		// Check for random exploration
		const randomly_explore_probabilities = [1 - this.epsilon, this.epsilon];
		const randomly_explore = this.random_choice(randomly_explore_probabilities);
		if (randomly_explore === '1') {
			return this.get_random_action();
		} else {
			const current_state_action_values = this.state_action_values[state];
			let max_state_action_value = 0;
			let best_action = 0;
			for (const action in Object.keys(current_state_action_values)) {
				let num_action = Number(action);
				if (current_state_action_values[num_action] >= max_state_action_value) {
					best_action = num_action;
					max_state_action_value = current_state_action_values[num_action];
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
				Q: JSON.parse(JSON.stringify(this.state_action_values))
			});
			const step_information = this.course.step(state, action);
			reward = step_information.reward;
			next_state = step_information.next_state;
			let next_action = this.get_next_action(next_state);
			let Q_orig = this.state_action_values[state][action];
			let Q_prime = this.state_action_values[next_state][next_action];
			const new_state_value = Q_orig + this.alpha * (reward + this.gamma * Q_prime - Q_orig);
			this.state_action_values[state][action] = new_state_value;
			if (next_state in this.goal_states) {
				break;
			}
			state = next_state;
			action = next_action;
		}
		return history;
	}
}

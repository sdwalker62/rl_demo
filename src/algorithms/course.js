export class Course {
	constructor(environment, mechanics, hyper_parameters) {
		this.mechanics = mechanics;
		this.epsilon = hyper_parameters.epsilon;
		this.randomly_explore_probabilities = [1 - this.epsilon, this.epsilon];
		this.goal_states = environment.goal_states;
		this.penalty_states = environment.penalty_states;
		this.action_cost = environment.action_cost;
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

	step(state, action) {
		const transition_mechanics = this.mechanics[action].matrix[state];
		const randomly_explore = this.random_choice(this.randomly_explore_probabilities);
		let next_state;
		if (randomly_explore === '1') {
			console.log('Explore!');
			action = this.get_random_action();
			let transition_matrix;
			switch (action) {
				case '0': // up
					transition_matrix = this.mechanics['up'].matrix[state];
					break;
				case '1': // right
					transition_matrix = this.mechanics['right'].matrix[state];
					break;
				case '2': // down
					transition_matrix = this.mechanics['down'].matrix[state];
					break;
				case '3': // left
					transition_matrix = this.mechanics['left'].matrix[state];
					break;
			}
			next_state = this.random_choice(transition_matrix);
		} else {
			next_state = this.random_choice(transition_mechanics);
		}
		return {
			next_state: next_state,
			reward: this.get_reward(Number(next_state)),
			done: next_state in this.goal_states
		};
	}
}

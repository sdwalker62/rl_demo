export class Course {
	constructor(mechanics, rewards, goal_states, epsilon = 0) {
		this.mechanics = mechanics;
		this.rewards = rewards;
		this.epsilon = epsilon;
		this.randomly_explore_probabilities = [1 - this.epsilon, this.epsilon];
		this.goal_states = goal_states;
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

	step(action) {
		try {
			const transition_mechanics = this.mechanics[action];
			const randomly_explore = this.random_choice(this.randomly_explore_probabilities);
			let next_state;
			if (randomly_explore) {
				next_state = this.get_random_action();
			} else {
				next_state = this.random_choice(transition_mechanics);
			}
			return {
				next_state: next_state,
				reward: this.rewards[next_state],
				done: next_state in this.goal_states
			};
		} catch (error) {
			// this needs to be improved
			console.log(`Action {action} not a valid action!`);
		}
	}
}

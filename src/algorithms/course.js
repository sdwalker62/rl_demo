export class Course {
	constructor(environment, mechanics, strategy, learning_parameters, max_iterations) {
		this.strategy = strategy;
		this.learning_parameters = learning_parameters;
		this.max_iterations = max_iterations;
		this.mechanics = mechanics;
	}

	solve() {}

	random_choice(probability_array) {
		var i,
			sum = 0,
			r = Math.random();
		for (i in probability_array) {
			sum += probability_array[i];
			if (r <= sum) return i;
		}
	}

	step(action) {
		try {
			const transition_mechanics = this.mechanics[action];
			let next_state = this.random_choice(transition_mechanics);
			if ('epsilon' in this.learning_parameters) {
				const randomly_explore_probabilities = [
					1 - this.learning_parameters.epsilon,
					this.learning_parameters.epsilon
				];
				const randomly_explore = this.random_choice(randomly_explore_probabilities);
				if (randomly_explore) {
					const num_actions = Object.keys(this.mechanics).length;
					const probability_array = new Array(num_actions).fill(1 / num_actions);
					return this.random_choice(probability_array);
				}
			}
			return next_state;
		} catch (error) {
			// this needs to be improved
			console.log(`Action {action} not a valid action!`);
		}
	}
}

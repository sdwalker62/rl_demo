export class Course {
	constructor(environment, mechanics, hyper_parameters) {
		this.mechanics = mechanics;
		this.epsilon = hyper_parameters.epsilon;
		this.goal_states = environment.goal_states;
		this.penalty_states = environment.penalty_states;
		this.action_cost = environment.action_cost;
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

	random_choice(probability_array) {
		var i,
			sum = 0,
			r = Math.random();
		for (i in probability_array) {
			sum += probability_array[i];
			if (r <= sum) return i;
		}
	}

	step(state, action) {
		const transition_mechanics = this.mechanics[action].matrix[state];
		const next_state = this.random_choice(transition_mechanics);
		const reward = this.get_reward(Number(next_state));
		return {
			next_state: Number(next_state),
			reward: reward
		};
	}
}

<script>
	import { TransitionMatrix } from '../../algorithms/transition_matrix';

	function createMatrix() {
		const n_states = 3;
		const up_probs = {
			up: 0.8,
			right: 0.1,
			down: 0,
			left: 0.1
		};
		const right_probs = {
			up: 0.1,
			right: 0.8,
			down: 0.1,
			left: 0
		};
		const down_probs = {
			up: 0,
			right: 0.1,
			down: 0.8,
			left: 0.1
		};
		const left_probs = {
			up: 0.1,
			right: 0,
			down: 0.1,
			left: 0.8
		};
		const obstacles = [3];
		let up_transition_matrix = new TransitionMatrix(n_states, up_probs, obstacles);
		let right_transition_matrix = new TransitionMatrix(n_states, right_probs, obstacles);
		let down_transition_matrix = new TransitionMatrix(n_states, down_probs, obstacles);
		let left_transition_matrix = new TransitionMatrix(n_states, left_probs, obstacles);

		console.log(up_transition_matrix.matrix);
		console.log(right_transition_matrix.matrix);
		console.log(down_transition_matrix.matrix);
		console.log(left_transition_matrix.matrix);
	}
</script>

<button on:click={createMatrix}> Build Matrix </button>

<script>
	import { TransitionMatrix } from '../../algorithms/transition_matrix';

	function createMatrix() {
		const n_states = 10;
		const probs = {
			up: 0.8,
			right: 0.1,
			down: 0,
			left: 0.1
		};
		const obstacles = [3, 8];
		let up_transition_matrix = new TransitionMatrix(n_states, probs, obstacles);
		console.log(up_transition_matrix.matrix);
	}
</script>

<button on:click|once={createMatrix}> Build Matrix </button>

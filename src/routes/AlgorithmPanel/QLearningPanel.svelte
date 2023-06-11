<script>
	import Slider from '@smui/slider';
	import { QLearning } from '../../algorithms/q_learning';
	import { populate_map, render_board } from '../../utils/grid_world_utils';
	import {
		replay_history,
		grid_world,
		environment,
		mechanics,
		policy_iteration,
		number_iterations,
		q_learning,
		lag
	} from '../../store/shared_data';

	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

	function max_Q(Q) {
		let max_Q_value = -100000;
		for (const action in Object.keys(Q)) {
			if (Q[action] > max_Q_value) {
				max_Q_value = Q[action];
			}
		}
		return max_Q_value;
	}

	function get_state_values(state_action_values) {
		let state_values = [];
		let num_states = Object.keys(state_action_values).length;
		for (let state_idx = 0; state_idx < num_states; state_idx++) {
			state_values.push(max_Q(state_action_values[state_idx]));
		}
		return state_values;
	}

	async function replay(history, num_iterations) {
		// for (let i = 0; i < num_iterations - 1; i++) {
		const i = history.length - 1;
		let state_values = get_state_values(history[i].Q);
		const history_with_state_values = {
			player_state: history[i].state,
			values: state_values
		};
		$grid_world = render_board($environment, history_with_state_values);
		await sleep($lag);
		// }
	}
	let max_steps = 100;
	function run_algorithm() {
		let strategy = new QLearning($environment, $mechanics, $q_learning);
		let history;
		let num_episodes;
		for (num_episodes = 0; num_episodes < 100; num_episodes++) {
			history = strategy.run_episode(max_steps);
		}
		replay(history, num_episodes);
	}
</script>

<div class="canvas">
	<div>
		<h1 id="iters">Iterations</h1>
		<h1 class="num-iterations">{$number_iterations}</h1>
	</div>
	<div>
		<label id="n-rows-label" for="rows">Number of rows</label>
		<input id="n-rows" bind:value={$environment.n_rows} />
	</div>
	<div>
		<label id="n-cols-label" for="n-cols">Number of columns</label>
		<input id="n-cols" bind:value={$environment.n_cols} />
	</div>
	<div>
		<Slider
			bind:value={$policy_iteration.gamma}
			min={0}
			max={1}
			step={0.001}
			input$aria-label="Continuous slider"
		/>
		<pre class="status">Gamma: {$policy_iteration.gamma}</pre>
	</div>
	<div>
		<Slider
			bind:value={$environment.action_cost}
			min={-10}
			max={10}
			step={0.1}
			input$aria-label="Continuous slider"
		/>
		<pre class="status">Action Cost: {$environment.action_cost}</pre>
	</div>
	<div>
		<label id="theta-label" for="theta">Theta</label>
		<input id="theta" bind:value={$policy_iteration.theta} />
	</div>
	<div>
		<button class="start" on:click={run_algorithm}> Start </button>
	</div>
</div>

<style>
	.canvas {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		background: #02006c;
		width: 20%;
		height: 100%;
		margin: 0 1em;
	}

	.alg_title {
		color: white;
		text-align: center;
		font-family: 'SF Pro';
	}

	.start {
		margin: 10px;
		width: 100px;
		height: 40px;
		background-color: #e55934;
		color: white;
		font-family: 'SF Pro';
		font-size: large;
	}

	.num-iterations {
		color: white;
		text-align: center;
		font-family: 'SF Pro';
		font-size: 5em;
	}

	#iters {
		color: white;
		text-align: center;
		font-family: 'SF Pro';
	}

	#n-cols-label,
	#n-rows-label,
	.status,
	#theta-label {
		color: white;
		font-family: 'SF Pro';
	}
</style>

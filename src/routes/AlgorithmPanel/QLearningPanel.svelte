<script>
	import Slider from '@smui/slider';
	import { QLearning } from '../../algorithms/q_learning';
	import { render_board } from '../../utils/grid_world_utils';
	import {
		grid_world,
		environment,
		mechanics,
		policy_iteration,
		number_iterations,
		q_learning,
		lag
	} from '../../store/shared_data';

	/**
	 * Sleep function needed for the episode renderer
	 *
	 * @param {number} ms - the amount of lag (set in shared_data.js)
	 */
	const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

	/**
	 * Calculates the state-value given the Q values.
	 * V(s) = max_{a} Q(s, a)
	 *
	 * @param {Object} Q
	 */
	function max_Q(Q) {
		let max_Q_value = -100_000;
		for (const action in Object.keys(Q)) {
			if (Q[action] > max_Q_value) {
				max_Q_value = Q[action];
			}
		}
		return max_Q_value;
	}

	/**
	 * Gets all of the state values from the Q matrix
	 *
	 * @param {Object} state_action_values - the Q values per state
	 */
	function get_state_values(state_action_values) {
		let state_values = [];
		let num_states = Object.keys(state_action_values).length;
		for (let state_idx = 0; state_idx < num_states; state_idx++) {
			state_values.push(max_Q(state_action_values[state_idx]));
		}
		return state_values;
	}

	/**
	 * Render each episode.
	 *
	 * @param {Array<Object>} history - episode history for rendering
	 */
	function replay(history) {
		const n_states = $environment.n_cols * $environment.n_rows;
		for (let i = 0; i < history.length - 1; i++) {
			let state_values = get_state_values(history[i].Q);
			for (let state_idx = 0; state_idx < n_states; state_idx++) {
				$grid_world = render_board($environment, {
					player_state: history[i].state,
					values: state_values
				});
			}
		}
	}

	/**
	 * This function is the main entry point for Q-learning. It is async
	 * to allow for render lag.
	 */
	async function run_algorithm() {
		let strategy = new QLearning($environment, $mechanics, $q_learning);
		for (let episode_idx = 0; episode_idx < $q_learning.num_episodes; episode_idx++) {
			const history = strategy.run_episode($q_learning.max_steps_per_episode);
			if (episode_idx % $q_learning.render_idx_step === 0) {
				replay(history);
			}
			await sleep($lag);
		}
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

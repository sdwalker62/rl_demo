<script>
	import Slider from '@smui/slider';
	import { QLearning } from '../../algorithms/q_learning';
	import { render_board } from '../../utils/grid_world_utils';
	import { grid_world, environment, mechanics, q_learning, lag } from '../../store/shared_data';

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
		let best_action = 0;
		for (const action in Object.keys(Q)) {
			if (Q[action] > max_Q_value) {
				max_Q_value = Q[action];
				best_action = Number(action);
			}
		}
		return {
			state_value: max_Q_value,
			best_action: best_action
		};
	}

	/**
	 * Gets all of the state values from the Q matrix
	 *
	 * @param {Object} state_action_values - the Q values per state
	 */
	function get_state_values(state_action_values) {
		let state_values = [];
		let best_actions = [];
		let num_states = Object.keys(state_action_values).length;
		for (let state_idx = 0; state_idx < num_states; state_idx++) {
			const best_Q = max_Q(state_action_values[state_idx]);
			state_values.push(best_Q.state_value);
			best_actions.push(best_Q.best_action);
		}
		return { state_values: state_values, best_actions: best_actions };
	}

	/**
	 * Render each episode.
	 *
	 * @param {Array<Object>} history - episode history for rendering
	 */
	function replay(history) {
		const n_states = $environment.n_cols * $environment.n_rows;
		for (let i = 0; i < history.length - 1; i++) {
			let state_information = get_state_values(history[i].Q);
			for (let state_idx = 0; state_idx < n_states; state_idx++) {
				$grid_world = render_board($environment, {
					player_state: history[i].state,
					values: state_information.state_values,
					actions: state_information.best_actions
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

<div class="algorithm-controls-canvas">
	<div class="input-box-container">
		<i class="fa-solid fa-arrows-left-right icon" />
		<input class="text-box" bind:value={$environment.n_rows} />
	</div>
	<div class="input-box-container">
		<i class="fa-solid fa-up-down icon" />
		<input class="text-box" bind:value={$environment.n_cols} />
	</div>
	<div class="input-box-container">
		<span class="slider-label">&epsilon;: {$q_learning.epsilon}</span>
		<input
			type="range"
			bind:value={$q_learning.epsilon}
			min={0}
			max={1}
			step={0.001}
			class="algorithm-slider"
		/>
	</div>
	<div class="input-box-container">
		<span class="slider-label">&gamma;: {$q_learning.gamma}</span>
		<input
			type="range"
			bind:value={$q_learning.gamma}
			min={0}
			max={1}
			step={0.001}
			class="algorithm-slider"
		/>
	</div>
	<div class="input-box-container">
		<span class="slider-label">&alpha;: {$q_learning.alpha}</span>
		<input
			type="range"
			bind:value={$q_learning.alpha}
			min={0}
			max={1}
			step={0.001}
			class="algorithm-slider"
		/>
	</div>
	<div class="input-box-container">
		<label class="text-box-label" for="theta">Max Steps Per Episode</label>
		<input class="text-box" bind:value={$q_learning.max_steps_per_episode} />
	</div>
	<div class="input-box-container">
		<label class="text-box-label" for="theta">Number of Episode</label>
		<input class="text-box" bind:value={$q_learning.num_episodes} />
	</div>
	<div class="input-box-container">
		<label class="text-box-label" for="theta">Action Cost</label>
		<input class="text-box" bind:value={$environment.action_cost} />
	</div>
	<div class="input-box-container">
		<input type="range" bind:value={$lag} min={0} max={100} step={10} class="algorithm-slider" />
		<pre class="status">Render Speed (ms): {$lag}</pre>
	</div>
	<div class="input-box-container">
		<label class="text-box-label" for="theta">Number of Episodes Between Renders</label>
		<input class="text-box" bind:value={$q_learning.render_idx_step} />
	</div>
	<div class="button-container">
		<button class="run-button" on:click={run_algorithm}> Start </button>
	</div>
</div>

<style>
	.status,
	#theta-label {
		color: white;
		font-family: 'SF Pro';
	}
</style>

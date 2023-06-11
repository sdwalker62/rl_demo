<script>
	import Slider from '@smui/slider';
	import { TransitionMatrix } from '../../algorithms/transition_matrix';
	import { PolicyIteration } from '../../algorithms/policy_iteration';
	import { environment, n_cols, n_rows, policy_iteration } from '../../store/shared_data';

	function run_algorithm() {
		// ======================================================================

		let strategy = new PolicyIteration($environment, $policy_iteration);

		strategy.solve(100);
		replay_history.set(strategy.history);
		$grid_world = populate_map(strategy.history);
		$n_iterations = strategy.n_iterations;
	}
</script>

<div class="canvas">
	<h3 class="alg_title">Policy Iteration</h3>
	<div>
		<h1 id="iters">Iterations</h1>
		<h1 class="num-iterations">{$n_iterations}</h1>
	</div>
	<div>
		<label id="n-rows-label" for="rows">Number of rows</label>
		<input id="n-rows" bind:value={$n_rows} />
	</div>
	<div>
		<label id="n-cols-label" for="n-cols">Number of columns</label>
		<input id="n-cols" bind:value={$n_cols} />
	</div>
	<div>
		<Slider bind:value={$gamma} min={0} max={1} step={0.001} input$aria-label="Continuous slider" />
		<pre class="status">Gamma: {$gamma}</pre>
	</div>
	<div>
		<Slider
			bind:value={$action_cost}
			min={-10}
			max={10}
			step={0.1}
			input$aria-label="Continuous slider"
		/>
		<pre class="status">Action Cost: {$action_cost}</pre>
	</div>
	<div>
		<label id="theta-label" for="theta">Theta</label>
		<input id="theta" bind:value={$theta} />
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

<script>
	import Slider from '@smui/slider';
	import { PolicyIteration } from '../../algorithms/policy_iteration';
	import { populate_map } from '../../utils/grid_world_utils';
	import {
		replay_history,
		grid_world,
		environment,
		mechanics,
		policy_iteration,
		number_iterations,
		current_frame
	} from '../../store/shared_data';

	$: if ($replay_history.length != 0) {
		$grid_world = populate_map($environment, $replay_history, $current_frame);
	}

	function run_algorithm() {
		let strategy = new PolicyIteration($environment, $mechanics, $policy_iteration);
		strategy.solve(100);
		replay_history.set(strategy.history);
		$current_frame = strategy.history.length - 1;
		// $grid_world = populate_map($environment, strategy.history, frame_idx);
		$number_iterations = strategy.n_iterations;
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

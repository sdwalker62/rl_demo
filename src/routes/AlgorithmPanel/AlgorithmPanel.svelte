<script>
	import PolicyIterationPanel from './PolicyIterationPanel.svelte';
	import QLearningPanel from './QLearningPanel.svelte';
	let selected_algorithm;
	let algorithms = [
		{ id: 'policy_iteration', text: `Policy Iteration` },
		{ id: 'q_learning', text: 'Q-Learning' }
	];
</script>

<div class="algorithm-canvas">
	<select id="alg_select" bind:value={selected_algorithm}>
		{#each algorithms as algorithm}
			<option value={algorithm.id}>
				{algorithm.text}
			</option>
		{/each}
	</select>
	{#if selected_algorithm === 'policy_iteration'}
		<PolicyIterationPanel />
	{:else if selected_algorithm === 'q_learning'}
		<QLearningPanel />
	{/if}
</div>

<style>
	.algorithm-canvas {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: space-between;
		background: var(--background-color);
		width: 20%;
		height: 100%;
		margin: 1em;
	}

	#alg_select {
		height: 50px;
		width: 95%;
		font-size: 1.5em;
		border-radius: 10px;
		border-width: 0px;
		color: white;
		background-color: var(--transparency-color);
		text-align: center;
	}
</style>

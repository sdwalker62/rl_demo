<script>
	import PolicyIterationPanel from './PolicyIterationPanel.svelte';
	let selected_algorithm;
	let algorithms = [{ id: 'policy_iteration', text: `Policy Iteration` }];
</script>

<div class="canvas">
	<select bind:value={selected_algorithm}>
		{#each algorithms as algorithm}
			<option value={algorithm.id}>
				{algorithm.text}
			</option>
		{/each}
	</select>
	{#if selected_algorithm === 'policy_iteration'}
		<PolicyIterationPanel />
	{/if}
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
</style>

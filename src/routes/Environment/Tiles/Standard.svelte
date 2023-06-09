<script>
	export let state;

	const value = state.value;
	const policy_action = state.policy_action;
</script>

<div class="canvas" style="width: {100}%; height: {100}%">
	<div class="standard">
		<div class="info">
			<p class="icon">
				{#if policy_action === 'up'}
					<i id="arrow" class="fa-solid fa-arrow-up fa-3x" style="color: #ebebeb;" />
				{:else if policy_action === 'right'}
					<i id="arrow" class="fa-solid fa-arrow-right fa-3x" style="color: #ebebeb;" />
				{:else if policy_action === 'down'}
					<i id="arrow" class="fa-solid fa-arrow-down fa-3x" style="color: #ebebeb;" />
				{:else if policy_action === 'left'}
					<i id="arrow" class="fa-solid fa-arrow-left fa-3x" style="color: #ebebeb;" />
				{/if}
			</p>
			<span class="value">{value}</span>
		</div>
	</div>
</div>

<style>
	.canvas {
		display: flex;
		background: #0c0c0c;
		aspect-ratio: 1 / 1;
		align-items: center;
		justify-content: center;
	}

	.standard {
		background: #02006c;
		aspect-ratio: 1 / 1;
		width: 99.5%;
		height: 99.5%;
		align-items: center;
		justify-content: center;
	}

	.info {
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.icon {
		display: inline-block;
		text-align: center;
	}

	#arrow {
		flex-grow: 1;
	}

	.value {
		flex-grow: 2;
		font-size: xx-large;
		font-family: 'SF Pro';
		color: white;
	}
</style>

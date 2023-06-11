<script>
	import { min_value, max_value } from '../../../store/shared_data';
	export let state;

	const policy_action = state.policy_action;
</script>

<div class="canvas" style="width: {100}%; height: {100}%">
	<div class="standard" style="background-color: white;">
		<div class="info">
			<p class="icon">
				{#if policy_action === 'up'}
					<i id="arrow" class="fa-solid fa-arrow-up" style="color: #ebebeb;" />
				{:else if policy_action === 'right'}
					<i id="arrow" class="fa-solid fa-arrow-right" style="color: #ebebeb;" />
				{:else if policy_action === 'down'}
					<i id="arrow" class="fa-solid fa-arrow-down" style="color: #ebebeb;" />
				{:else if policy_action === 'left'}
					<i id="arrow" class="fa-solid fa-arrow-left" style="color: #ebebeb;" />
				{/if}
			</p>
		</div>
	</div>
</div>

<style>
	.canvas {
		display: flex;
		background: #ffffff;
		aspect-ratio: 1 / 1;
		align-items: center;
		justify-content: center;
	}

	.standard {
		background: #ffffff;
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
		font-size: 1em;
	}

	.value {
		flex-grow: 2;
		font-size: 1em;
		font-family: 'SF Pro';
		color: white;
	}
</style>

<script>
	import { min_reward, max_reward, n_states } from '../../../store/shared_data';
	export let state;
	const value = state.value;

	const value_range = $max_reward - $min_reward;
	const color_ratio = value / value_range;

	/**
	 * @param {number} value - between 0 and 1
	 */
	function getColor(value) {
		var hue = (value * 220).toString(10);
		return ['hsl(', hue, ', 100%, 40%)'].join('');
	}
	let color;
	if (value === 0) {
		color = '#0C0C0C';
	} else {
		color = getColor(color_ratio);
	}
	const policy_action = state.policy_action;

	let show_arrow = true;
	if ($n_states > 200) {
		show_arrow = false;
	}

	let show_values = true;
	if ($n_states > 200) {
		show_values = false;
	}
</script>

<div class="canvas">
	<div class="standard" style="background-color: red;">
		<div class="info">
			{#if show_arrow}
			<p class="icon">
				{#if policy_action === 0}
					<i id="arrow" class="fa-solid fa-arrow-up" style="color: #ebebeb;" />
				{:else if policy_action === 1}
					<i id="arrow" class="fa-solid fa-arrow-right" style="color: #ebebeb;" />
				{:else if policy_action === 2}
					<i id="arrow" class="fa-solid fa-arrow-down" style="color: #ebebeb;" />
				{:else if policy_action === 3}
					<i id="arrow" class="fa-solid fa-arrow-left" style="color: #ebebeb;" />
				{/if}
			</p>
			{/if}
			{#if show_values}
				<span class="value">{value.toFixed(2)}</span>
			{/if}
		</div>
	</div>
</div>

<style>
	.canvas {
		display: flex;
		background: #1f1f1f;
		aspect-ratio: 1 / 1;
		align-items: center;
		justify-content: center;
		padding: 0px;
		margin: 0px;
	}

	.standard {
		background: #1f1f1f;
		aspect-ratio: 1 / 1;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
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

	.icon:after {
		content: '\200b';
	}

	#arrow {
		flex-grow: 1;
		font-size: 1em;
	}

	.value {
		flex-grow: 2;
		font-size: 1.2vi;
		font-family: 'SF Pro';
		color: white;
	}
</style>

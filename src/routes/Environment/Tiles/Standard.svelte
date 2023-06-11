<script>
	import { min_value, max_value } from '../../../store/shared_data';
	export let state;
	const value = state.value;

	const value_range = $max_value - $min_value;
	const color_ratio = value / value_range;

	/**
	 * @param {number} value - between 0 and 1
	 */
	function getColor(value) {
		var hue = (value * 200).toString(10);
		return ['hsl(', hue, ', 100%, 40%)'].join('');
	}
	let color;
	if (value === 0) {
		color = '#0C0C0C';
	} else {
		color = getColor(color_ratio);
	}
	const policy_action = state.policy_action;
</script>

<div class="canvas" style="width: {100}%; height: {100}%">
	<div class="standard" style="background-color: {color};">
		<div class="info">
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
			<span class="value">{value.toFixed(2)}</span>
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
		font-size: 1em;
	}

	.value {
		flex-grow: 2;
		font-size: 1em;
		font-family: 'SF Pro';
		color: white;
	}
</style>

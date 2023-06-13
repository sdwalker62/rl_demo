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

	// Sizes breakpoints for icons
	let icon_size = '1em';
	let text_size = '1em';
	let icon_color = 'rgba(255, 255, 255, 1)';
	let show_arrow = true;
	let show_values = true;
	if (0 < $n_states && $n_states <= 200) {
		icon_color = 'rgba(255, 255, 255, 0.75)';
		icon_size = '0.7em';
		text_size = '1em';
	} else if (200 < $n_states && $n_states <= 400) {
		icon_color = 'rgba(255, 255, 255, 0.6)';
		icon_size = '0.5em';
		text_size = '0.7em';
	} else if (400 < $n_states && $n_states <= 900) {
		icon_color = 'rgba(255, 255, 255, 0.5)';
		icon_size = '0.3em';
		text_size = '0.2em';
	}
</script>

<div class="canvas" style="background-color: {color};">
	{#if show_arrow}
		<div class="icon">
			{#if policy_action === 0}
				<i class="fa-solid fa-arrow-up" style="color: {icon_color}; font-size: {icon_size}" />
			{:else if policy_action === 1}
				<i class="fa-solid fa-arrow-right" style="color: {icon_color}; font-size: {icon_size}" />
			{:else if policy_action === 2}
				<i class="fa-solid fa-arrow-down" style="color: {icon_color}; font-size: {icon_size}" />
			{:else if policy_action === 3}
				<i class="fa-solid fa-arrow-left" style="color: {icon_color}; font-size: {icon_size}" />
			{/if}
		</div>
	{/if}
	{#if show_values}
		<span class="value" style="font-size: {text_size}">{value.toFixed(2)}</span>
	{/if}
</div>

<style>
	.canvas {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto auto;
		background: #1f1f1f;
		padding: 0px;
		margin: 0px;
		width: 100%;
		height: 100%;
		justify-content: center;
		align-items: center;
	}

	.icon {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
		text-align: center;
		justify-self: center;
		width: 100%;
		height: 100%;
	}

	.value {
		font-family: 'SF Pro';
		color: white;
		height: 100%;
		width: 100%;
		text-align: center;
	}
</style>

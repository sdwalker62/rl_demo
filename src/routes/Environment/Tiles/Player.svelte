<script>
	import { n_states } from '../../../store/shared_data';

	// Sizes breakpoints for icons
	let icon_size;
	if (0 < $n_states && $n_states <= 200) {
		icon_size = '2.5em';
	} else if (200 < $n_states && $n_states <= 400) {
		icon_size = '.8em';
	} else if (400 < $n_states && $n_states <= 900) {
		icon_size = '0.5em';
	}
</script>

<div class="canvas">
	<i id="player" class="fa-solid fa-robot" style="font-size: {icon_size}" />
</div>

<style>
	.canvas {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
		background: #1f1f1f;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	#player {
		color: #ffffff;
	}
</style>

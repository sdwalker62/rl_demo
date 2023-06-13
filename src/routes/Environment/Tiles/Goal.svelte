<script>
	import { n_states } from '../../../store/shared_data';

	// Sizes breakpoints for icons
	let icon_size;
	if (0 < $n_states && $n_states <= 200) {
		icon_size = '1.2em';
	} else if (200 < $n_states && $n_states <= 400) {
		icon_size = '.8em';
	} else if (400 < $n_states && $n_states <= 900) {
		icon_size = '0.5em';
	}
</script>

<div class="canvas">
	<p class="icon">
		<i id="goal" class="fa-solid fa-coins center" style="font-size: {icon_size}" />
	</p>
</div>

<style>
	.canvas {
		display: flex;
		flex-direction: column;
		background: #1f1f1f;
		aspect-ratio: 1 / 1;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.icon {
		text-align: center;
		width: 100%;
		height: 100%;
	}

	#goal {
		color: #ffdd00;
		flex-grow: 1;
	}
</style>

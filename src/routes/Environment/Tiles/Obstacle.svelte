<script>
	import { n_states } from '../../../store/shared_data';

	// Sizes breakpoints for icons
	let icon_size;
	if (0 < $n_states && $n_states <= 200) {
		icon_size = '3em';
	} else if (200 < $n_states && $n_states <= 400) {
		icon_size = '1.2em';
	} else if (400 < $n_states && $n_states <= 900) {
		icon_size = '1em';
	}
</script>

<div class="canvas">
	<div class="obstacle">
		<i id="obstacle" class="fa-solid fa-road-barrier" style="font-size: {icon_size}" />
	</div>
</div>

<style>
	.canvas {
		display: flex;
		flex-direction: column;
		background: #02006c;
		align-items: center;
		justify-content: center;
		width: 100%;
		height: 100%;
	}

	.obstacle {
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
		border-radius: 0px;
		background: linear-gradient(145deg, #020074, #020061);
		box-shadow: 5px 5px 7px #01002b, -5px -5px 7px #0300ad;
		width: calc(100% - 10px);
		height: calc(100% - 10px);
		align-items: center;
		justify-content: center;
		text-align: center;
	}

	#obstacle {
		color: #ff0033;
	}
</style>

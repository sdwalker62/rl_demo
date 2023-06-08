<script>
	import { afterUpdate } from 'svelte';
	import { colorMode } from '../../store/shared_data';

	function switchTheme(e) {
		if (e.target.checked) {
			colorMode.set('light');
			document.documentElement.setAttribute('data-theme', 'light');
		} else {
			colorMode.set('dark');
			document.documentElement.setAttribute('data-theme', 'dark');
		}
	}

	function switchToDark() {
		const switch_element = document.getElementById('main-dark-light-switch');
		switch_element.checked = false;
	}

	function switchToLight() {
		document.getElementById('main-dark-light-switch').checked = true;
	}

	afterUpdate(() => {
		switch ($colorMode) {
			case 'dark':
				switchToDark();
				break;
			case 'light':
				switchToLight();
				break;
			default:
				break;
		}
	});
</script>

<svelte:head>
	<link href="fontawesome/css/fontawesome.css" rel="stylesheet" />
	<link href="fontawesome/css/solid.css" rel="stylesheet" />
</svelte:head>

<div id="light-mode-toggle">
	<input type="checkbox" id="main-dark-light-switch" on:change={switchTheme} />
	<label for="main-dark-light-switch">
		<i class="fas fa-moon" />
		<i class="fas fa-sun" />
		<div class="ball" />
	</label>
</div>

<style>
	#light-mode-toggle {
		margin-right: 1.3em;
		transition: var(--transition);
	}

	* {
		box-sizing: border-box;
		transition: var(--transition);
	}

	input {
		opacity: 0;
		position: absolute;
		transition: var(--transition);
	}

	label {
		width: 45px;
		height: 20px;
		display: flex;
		border-radius: 50px;
		align-items: center;
		justify-content: space-between;
		padding: 5px;
		position: relative;
		transform: scale(1.5);
		background-color: var(--button-background);
		box-shadow: var(--button-box-shadow);
		transition: var(--transition);
		cursor: pointer;
	}

	.ball {
		width: 17px;
		height: 17px;
		position: absolute;
		top: 1.4px;
		left: 2px;
		border-radius: 50%;
		background: var(--slider-ball);
		transition: transform 0.1s linear;
	}

	#main-dark-light-switch:checked + label .ball {
		transform: translateX(23px);
	}

	i {
		color: #e0e0e0;
		font-size: 9pt;
		transition: var(--transition);
	}
</style>

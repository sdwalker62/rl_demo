<script>
	import DarkMode from './DarkMode.svelte';
	import { current_page } from '../../store/shared_data';
</script>

<div class="canvas">
	<div id="logo-container">
		<img id="logo" src="temple.png" alt="Logo" />
		<span id="title">Reinforcement Learning Academy</span>
	</div>
	<div id="page-options-container">
		{#if $current_page == 'home'}
			<button
				class="page-option"
				style="color: red; font-weight: 900"
				on:click={() => {
					$current_page = 'home';
				}}>Home</button
			>
		{:else}
			<button
				class="page-option"
				on:click={() => {
					$current_page = 'home';
				}}>Home</button
			>
		{/if}
		{#if $current_page == 'mdp'}
			<button
				class="page-option"
				style="color: red; font-weight: 900"
				on:click={() => {
					$current_page = 'mdp';
				}}>Markov Decision Process</button
			>
		{:else}
			<button
				class="page-option"
				on:click={() => {
					$current_page = 'mdp';
				}}>Markov Decision Process</button
			>
		{/if}
		{#if $current_page == 'grid_world'}
			<button
				class="page-option"
				style="color: red; font-weight: 900"
				on:click={() => {
					$current_page = 'grid_world';
				}}>Grid World</button
			>
		{:else}
			<button
				class="page-option"
				on:click={() => {
					$current_page = 'grid_world';
				}}>Grid World</button
			>
		{/if}
		{#if $current_page == 'ppo'}
			<button
				class="page-option"
				style="color: red; font-weight: 900"
				on:click={() => {
					$current_page = 'ppo';
				}}>Proximal Policy Optimization</button
			>
		{:else}
			<button
				class="page-option"
				on:click={() => {
					$current_page = 'ppo';
				}}>Proximal Policy Optimization</button
			>
		{/if}
	</div>
	<DarkMode />
</div>

<style>
	.canvas {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		background-color: white;
		width: 100%;
		height: 30px;
		min-height: 30px;
		max-height: 30px;
		border-radius: 1px;
	}

	#logo-container {
		display: flex;
		flex-direction: row;
		margin-left: 5px;
	}

	#logo {
		width: 20px;
		height: 20px;
	}

	#page-options-container {
		display: flex;
		flex-direction: row;
		gap: 20px;
	}

	.page-option {
		font-size: 1em;
		font-family: 'SF Pro Display';
		color: black;
		background-color: white;
		border: none;
		border-radius: 5px;
	}

	.page-option:hover {
		background-color: rgba(0, 0, 0, 0.2);
	}

	#title {
		margin-left: 0.5em;
		font-family: 'SF Pro Display Medium';
		font-size: 1.2em;
		font-weight: bold;
		color: black;
	}
</style>

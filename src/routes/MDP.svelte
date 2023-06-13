<script id="MathJax-script">
	import { onMount } from 'svelte';

	let equ1 = `$$\\quad \\, \\, q_{\\pi} (s, a) \\doteq \\mathbb{E}_{\\pi} \\left[G_t | S_t = s, A_t =a \\right] = \\mathbb{E}_{\\pi} \\left[\\sum_{k=0}^\\infty \\gamma^k R_{t+k+1} \\mid S_t=s, A_t=a \\right].$$`;
	let equ2 = `
    \\[
        \\begin{align*}
        v_{\\pi}(s)  & \\doteq \\mathbb{E}_{\\pi} [G_t \\mid S_t = s] \\\\
        & = \\mathbb[R_{t+1} + \\gamma G_{t+1} \\mid S_t =s ] \\\\
        & = \\sum_{a} \\pi(a|s)\\sum_{s'} \\sum_r p(s', r | s, a)\\left[r + \\gamma  \\mathbb{E}_{\\pi}[G_{t+1} \\mid S_{t+1}=s']\\right] \\\\
        & = \\sum_a \\pi(a|s) \\sum_{s', r} p(s', r | s,a)[r + \\gamma v_{\\pi}(s')], \\quad \\forall s \\in \\mathcal{S}
        \\end{align*}
    \\]
    `;

	onMount(() => {
		let script = document.createElement('script');
		script.src = 'https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-svg.js';
		document.head.append(script);

		script.onload = () => {
			MathJax = {
				tex: {
					inlineMath: [
						['$', '$'],
						['\\(', '\\)']
					]
				},
				svg: { fontCache: 'global' }
			};
		};
	});
</script>

<!-- {  MERMAID CONFIG
    "theme": "base",
    "themeVariables": {
        "primaryColor": "#02006c",
        "primaryTextColor": "#E0E2DB",
        "primaryBorderColor": "#4a47ff",
        "lineColor": "#E6AF2E",
        "secondaryColor": "#BA1200",
        "tertiaryColor": "#fff"
      }
  } -->

<div id="dex-vid">
	<iframe width="1280" height="720" src="https://www.youtube.com/embed/jwSbzNHGflM" />
</div>

<div class="text-container">
	<h3 class="h3">Basics</h3>
	<figure style="text-align: center; align-items: center">
		<img
			width="100%"
			height="720"
			class="diagram"
			src="agent-env.svg"
			alt="agent and environment interation"
		/>
		<figcaption class="caption">Figure 1: Agents interaction with it's environment.</figcaption>
	</figure>

	<figure style="text-align: center; align-items: center">
		<img
			width="100%"
			height="720"
			class="diagram"
			src="simple-mdp.svg"
			alt="agent and environment interation"
		/>
		<figcaption class="caption">
			Figure 2: Simple MDP with three states and one absorbing state.
		</figcaption>
	</figure>

	<figure style="text-align: center; align-items: center">
		<img
			width="600px"
			class="diagram"
			src="basic-backup.svg"
			alt="agent and environment interation"
		/>
		<figcaption class="caption">Basic backup diagram</figcaption>
	</figure>

	<figure style="text-align: center; align-items: center">
		<img
			width="100%"
			height="720"
			class="diagram"
			src="family.svg"
			alt="agent and environment interation"
		/>
		<figcaption class="caption">Family tree of some popular RL algorithm [1]</figcaption>
	</figure>

	<p class="math-eq">{equ1}</p>
	<p class="math-eq">{equ2}</p>

	<h3 class="h3">Policy Iteration</h3>
	<p class="math-eq">
		{`$$\\pi_{0} \\xrightarrow{E} v_{\\pi_{0}} \\xrightarrow{I} \\pi_{1} \\xrightarrow{E} v_{\\pi_{1}} \\xrightarrow{I} \\pi_{2} \\xrightarrow{E} \\cdots \\xrightarrow{I} \\pi_{*} \\xrightarrow v_{*}$$`}
	</p>
	<figure style="text-align: center; align-items: center">
		<img width="100%" class="diagram" src="pi.jpeg" alt="agent and environment interation" />
		<figcaption class="caption">Policy Iteration Algorithm [1]</figcaption>
	</figure>

	<h3 class="h3">SARSA</h3>
	<p class="math-eq">
		{`$$Q(S_{t}, A_{t}) \\leftarrow Q(S_{t}, A_{t}) + \\alpha \\left[R_{t+1} + \\gamma Q(S+{t+1}, A_{t+1}) - Q(S_{t}, A_{t}) \\right]$$`}
	</p>
	<figure style="text-align: center; align-items: center">
		<img
			width="600px"
			class="diagram"
			src="sarsa-backup.svg"
			alt="agent and environment interation"
		/>
		<figcaption class="caption">SARSA backup diagram</figcaption>
	</figure>
	<figure style="text-align: center; align-items: center">
		<img width="100%" class="diagram" src="sarsa.jpeg" alt="agent and environment interation" />
		<figcaption class="caption">SARSA algorithm</figcaption>
	</figure>

	<div class="line-break" />
	<h1 class="h1">References</h1>

	<ol class="references-list">
		<li class="references-list-item">
			“Part 2: Kinds of RL Algorithms¶.” Part 2: Kinds of RL Algorithms - Spinning Up Documentation,
			spinningup.openai.com/en/latest/spinningup/rl_intro2.html. Accessed 13 June 2023.
		</li>
	</ol>
</div>

<style>
	#main-page {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
	}

	#dex-vid {
		margin-top: 50px;
		display: grid;
		grid-template-columns: auto;
		grid-template-rows: auto;
		width: 100%;
		align-items: center;
		justify-content: center;
	}

	.diagram {
		max-height: 600px;
	}

	.math {
		color: white;
		font-size: 2em;
	}
</style>

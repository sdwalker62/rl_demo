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
<div id="main-page">
	<img class="diagram" src="agent-env.svg" alt="agent and environment interation" />
</div>

<div id="main-page">
	<img class="diagram" src="family.svg" alt="agent and environment interation" />
</div>

<p class="math">{equ1}</p>
<p class="math">{equ2}</p>

<div class="line-break" />
<h1 class="h1">References</h1>

<ol class="references-list">
	<li class="references-list-item">
		“Part 2: Kinds of RL Algorithms¶.” Part 2: Kinds of RL Algorithms - Spinning Up Documentation,
		spinningup.openai.com/en/latest/spinningup/rl_intro2.html. Accessed 13 June 2023.
	</li>
</ol>

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

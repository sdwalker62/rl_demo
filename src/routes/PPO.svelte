<script id="MathJax-script2">
	import { onMount } from 'svelte';
	// import mermaid from 'mermaid';

	let equ1 = `
    \\[
    \\pi_\\theta (A \\mid S), \\hspace{1em} \\text{where } \\sum_{a\\in A_s} \\pi_\\theta(a \\mid s) = 1.
    \\]
    `;

	let equ2 = `
    \\[
    \\hat{g} = \\hat{\\mathbb{E}} \\left[\\nabla_\\theta \\log \\pi_\\theta (a_t \\mid s_t)\\hat{A}_t \\right]
    \\]
    `;

	let equ3 = `
    \\[
    \\begin{align*}
        \\max_\\theta \\hspace{1em} & \\hat{\\mathbb{E}}_t \\left[\\frac{\\pi_\\theta (a_t \\mid s_t)}{\\pi_{\\theta_{\\text{old}}}(a_t \\mid s_t)} \\hat{A}_t \\right] \\\\
        \\text{subject to}\\hspace{1em} & \\hat{\\mathbb{E}}_t [\\text{KL}[\\pi_{\\theta_{\\text{old}}}(\\cdot \\mid s_t), \\pi_\\theta(\\cdot \\mid s_t)]] \\leq \\delta.
    \\end{align*}
    \\]
    `;

	let equ4 = `
    \\[
        \\max_\\theta \\hat{\\mathbb{E}}_t \\left[\\frac{\\pi_\\theta (a_t \\mid s_t)}{\\pi_{\\theta_{\\text{old}}}(a_t \\mid s_t)} \\hat{A}_t - \\beta \\text{KL}[\\pi_{\\theta_{\\text{old}}}(\\cdot \\mid s_t), \\pi_\\theta(\\cdot \\mid s_t)] \\right]
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

<p class="math">{equ1}</p>
<p class="math">{equ2}</p>
<p class="math">{equ3}</p>
<p class="math">{equ4}</p>

<style>
	#main-page {
		margin-top: 50px;
		display: flex;
		flex-direction: column;
	}

	.diagram {
		max-height: 600px;
	}

	.math {
		color: white;
		font-size: 2em;
	}
</style>

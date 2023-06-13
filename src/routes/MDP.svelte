<script id="MathJax-script">
	import { onMount } from 'svelte';
	// import mermaid from 'mermaid';

	let equ1 = `$$x = {-b \\pm \\sqrt{b^2-4ac} \\over 2a}$$`;

	// // The default diagram
	// let diagram = `\
	// flowchart TD
	// A[Agent] -->|Action| B(((Environment)))
	// B --> |State| A
	// B --> |Reward| A`;

	// let container;

	// async function renderDiagram() {
	// 	const { svg } = await mermaid.render('mermaid', diagram);
	// 	container.innerHTML = svg;
	// }

	// $: diagram && renderDiagram();

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

<div id="main-page">
	<img class="diagram" src="agent-env.svg" alt="agent and environment interation" />
</div>

<p class="math">{equ1}</p>

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

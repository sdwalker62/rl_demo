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

	let equ5 = `
    \\[r_t(\\theta) = \\frac{\\pi_\\theta (a_t \\mid s_t)}{\\pi_{\\theta_{\\text{old}}}(a_t \\mid s_t)}\\]
    `;

	let equ6 = `
    \\[
        L^{CLIP}(\\theta) = \\hat{\\mathbb{E}}_t\\left[\\min(r_t(\\theta)\\hat{A}_t,\\, \\text{clip}(r_t(\\theta), 1-\\epsilon, 1+\\epsilon)\\hat{A}_t) \\right]
    \\]
    `;

	let equ7 = `
    \\[
        L_t^{CLIP + VF + S} (\\theta) = \\hat{E}_t[L_t^{CLIP}(\\theta) - c_1L_t^{VF}(\\theta) + c_2S[\\pi_\\theta](s_t)]
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
					],
					displayMath: [
						['$$', '$$'],
						['\\[', '\\]']
					],
					processEscapes: true,
					processEnvironments: true
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

<div id="text-container">
	<h1 id="title">Proximal Policy Optimization</h1>
	<p class="math">
		We will assume the standard notation used in Markov Decision Processes (MDP) in the rest of this
		paper. Let the 4-tuple {`$(S, A, T, R)$`} be an MDP where {`$S$`} is a set of states which are traversable
		by an agent within the environment, {`$A$`} a set of actions available to the agent at each time
		step
		{`$t$`}, {`$T$`} a statistical distribution mapping state-action pairs to probability distributions
		over next states, and {`$R: S \\times A → R$`} a reward function mapping state-action pairs to real-valued
		rewards. Let {`$\\pi$`} be a policy that maps states to actions, {`$\\pi : S → A$`}, defining
		the behavior of our agent throughout the environment. In this paper, we will consider a
		stochastic policy which gives a conditional distribution with parameters {`$\\theta$`} over actions
		{`$a_1, \\dots , a_{|A_s|}$`}
		available to the agent in a state {`$s \\in S$`},
	</p>
	<p class="math">{equ1}</p>

	<p class="math">
		An approximation of state-action pairs {`$A : S \\times A → R$`}, called the advantage function,
		estimates the delta of taking specific actions in a state compared to the average value of
		state-action pairs in that state: {`$A(s, a) = Q(s, a)−V(s)$`} where
		{`$V: S → R$`} is the value-function for a state {`$s \\in S$`}. Using common optimization
		techniques, we can estimate the gradient of a policy using gradient estimators,
	</p>

	<p class="math">{equ2}</p>

	<p class="math">
		where the expectation {`$\\hat{\\mathbb{E}}[\\ldots]$`} is the sample average over a finite batch
		of complete or truncated trajectories. Policy gradient algorithms alternate between sampling from
		these trajectories and optimization. Empirically, performing sequen- tial optimizations on the same
		sample trajectory leads to destructively large policy updates. The bad policy generated from this
		process yields bad samples, which are fed into our optimization algorithm and ultimately lead to
		an even worse policy after repeating the same process. If, instead, we perform one or two optimization
		steps using a sample trajectory, our learning will be very slow. This leads to data inefficiency
		since we must generate a new trajectory for every update.
	</p>

	<p class="math">
		To solve this data inefficiency, we could use a replay buffer, as is common in deep Q-networks.
		Unfortunately, this will not work since samples from a replay buffer will contain trajec- tories
		generated from various policies. We require trajectories only from the current policy to
		calculate an accurate gradient. Trusted Region Policy Optimization (TRPO) improved the sampling
		efficiency by using importance sampling to evaluate the properties of a hypothetical policy
		distribution using only samples from the current distribution. To improve the stability of each
		update, the Kullback–Leibler divergence, a distance measure between two statistical
		distributions, of the current and proposed distribution was bounded by a constant {`$\\delta$`}:
	</p>

	<p class="math">{equ3}</p>

	<p class="math">To lift the constraint, we can instead solve the Lagrangian dual:</p>

	<p class="math">{equ4}</p>

	<p class="math">
		or some penalty coefficient {`$\\beta$`}. This paper will use clipped-PPO, defined as follows.
		Let
		{`$rt(\\theta)$`} be the ratio of new and old policies:
	</p>

	<p class="math">{equ5}</p>

	<p class="math">
		then {`$r(\\theta_{\\text{old}})=1$`}. Instead of maximizing the objective function {`$\\hat{\\mathbb{E}} \\left[ r_t(\\theta) \\hat{A}_t\\right]$`}
		as in TRPO we will use the objective function
	</p>

	<p class="math">{equ6}</p>

	<p class="math">
		where {`$\\epsilon$`} is a hyperparameter. The clip function limits the update to within the range
		{`$[1-\\epsilon, 1+\\epsilon]$`}
		instead of using the KL divergence. The minimum function makes the final objective a lower bound
		on the unclipped objective. In practice, we use the following objective function:
	</p>

	<p class="math">{equ7}</p>

	<p class="math">
		where {`$c_1$`} and {`$c_2$`} are coefficients, {`$S$`} denotes an entropy bonus, and {`$L_t^{VF}$`}
		is a squared-error loss {`$(V_\\theta(s_t)-V_t^{\\text{target}})^2$`}. The full algorithm is
		presented in Algorithm 1.
	</p>

	<div id="ppo-alg-container">
		<img id="ppo-alg" src="ppo-alg.jpeg" alt="agent and environment interation" />
	</div>

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
	#title {
		font-size: 3em;
		font-family: 'SF Pro Rounded Medium';
		color: white;
	}
	#text-container {
		display: flex;
		flex-direction: column;
		margin-left: 20%;
		margin-right: 20%;
	}

	#ppo-alg {
		width: 800px;
	}

	#ppo-alg-container {
		width: 100%;
		justify-content: center;
		align-items: center;
	}

	.math {
		color: white;
		font-size: 1.5em;
		font-family: 'SF Pro';
		font-weight: 300;
	}
</style>

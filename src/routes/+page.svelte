<script lang="ts">
	import WordPart from '$lib/features/quartiles/components/WordPart.svelte';
	import type {
		QuartilesSolutionBuckets,
		SolveResponseSuccess
	} from '$lib/features/quartiles/types';

	const emptySolutions: QuartilesSolutionBuckets = { one: [], two: [], three: [], four: [] };
	let parts = $state(Array.from({ length: 20 }, () => ''));
	let solutions = $state<QuartilesSolutionBuckets>({ ...emptySolutions });
	let error = $state('');

	async function solve() {
		error = '';
		const res = await fetch('/api/solve', {
			method: 'POST',
			body: JSON.stringify({ parts }),
			headers: { 'Content-Type': 'application/json' }
		});
		if (!res.ok) {
			error = 'Error communicating with server.';
			return;
		}
		const data = (await res.json()) as SolveResponseSuccess;
		if (data.count > 0) {
			solutions.one = data.solution.one;
			solutions.two = data.solution.two;
			solutions.three = data.solution.three;
			solutions.four = data.solution.four;
		} else {
			solutions.one = [];
			solutions.two = [];
			solutions.three = [];
			solutions.four = [];
			error = 'No solutions found.';
		}
	}

	const clear = () => {
		parts.forEach((_, i) => (parts[i] = ''));
		solutions.one = [];
		solutions.two = [];
		solutions.three = [];
		solutions.four = [];
		error = '';
	};
</script>

<div class="flex flex-col items-center justify-center gap-4">
	{#each Array(5) as _, i (i)}
		<div class=" flex gap-2">
			{#each Array(4) as _, j (i * 4 + j)}
				<WordPart bind:value={parts[i * 4 + j]} />
			{/each}
		</div>
	{/each}
	<div>
		<button class="btn preset-filled-secondary-50-950" onclick={solve}>Solve</button>
		<button class="btn preset-filled-error-500" onclick={clear}>Clear</button>
	</div>
	{#if error}
		<div class="font-bold text-red-500">{error}</div>
	{/if}

	<div class="grid w-full max-w-5xl grid-cols-1 gap-6 text-left md:grid-cols-2">
		{#if solutions.four.length > 0}
			<div class="card preset-tonal-surface p-4">
				<h2 class="text-xl font-bold">Quartiles</h2>
				<ul>
					{#each solutions.four as word (word)}
						<li>{word}</li>
					{/each}
				</ul>
			</div>
		{/if}

		{#if solutions.three.length > 0}
			<div class="card preset-tonal-surface p-4">
				<h2 class="text-xl font-bold">Three Pieces</h2>
				<ul>
					{#each solutions.three as word (word)}
						<li>{word}</li>
					{/each}
				</ul>
			</div>
		{/if}

		{#if solutions.two.length > 0}
			<div class="card preset-tonal-surface p-4">
				<h2 class="text-xl font-bold">Duos</h2>
				<ul>
					{#each solutions.two as word (word)}
						<li>{word}</li>
					{/each}
				</ul>
			</div>
		{/if}

		{#if solutions.one.length > 0}
			<div class="card preset-tonal-surface p-4">
				<h2 class="text-xl font-bold">Singletons</h2>
				<ul>
					{#each solutions.one as word (word)}
						<li>{word}</li>
					{/each}
				</ul>
			</div>
		{/if}
	</div>
</div>

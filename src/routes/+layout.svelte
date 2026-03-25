<script lang="ts">
	import './layout.css';
	import favicon from '$lib/assets/favicon.svg';

	let { children } = $props();
</script>

<svelte:head><link rel="icon" href={favicon} /></svelte:head>
<h1 class="my-4 ml-10 text-3xl">Quartiles Solver</h1>

{@render children()}

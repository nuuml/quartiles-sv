<script lang="ts">
	let { value = $bindable('') } = $props();
</script>

<div class="max-w-30 card rounded-2xl preset-tonal-primary p-4 shadow-sm">
	<input
		bind:value
		type="text"
		placeholder=""
		class="input w-full max-w-xs border-none outline-none focus:outline-hidden"
	/>
</div>

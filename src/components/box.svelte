<script lang="ts">
	import { fly } from 'svelte/transition';
	export let title: string = '';
	export let alignCenter: boolean = false;
</script>

<div class:center={alignCenter} in:fly={{ y: 50, duration: 1000 }}>
	{#if title}
		<p>{title}</p>
	{/if}
	<slot />
</div>

<style>
	div {
		border-radius: 8px;
		padding: 12px;
		background-color: var(--green-background);
		margin-bottom: 32px;
	}
	.center {
		padding-top: 4px;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	p {
		margin: 0px 0 12px 0;
	}
</style>

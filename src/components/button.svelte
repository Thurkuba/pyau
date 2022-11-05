<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	export let path: string = '';
	export let text: string = '';
	export let secondary: boolean = false;

	const dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('click');
	};
</script>

{#if path}
	<a href={path}>
		{text}
	</a>
{:else}
	<button on:click={handleClick} class:secondary>{text}</button>
{/if}

<style>
	button,
	a {
		background-color: var(--green-background);
		border: 0px;
		border-radius: 8px;
		padding: 16px 20px;
		font-size: 16px;
		color: black;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.secondary {
		background-color: var(--red-background);
	}
</style>

<script lang="ts">
	import { fly } from 'svelte/transition';
	export let title = '';
	export let alignCenter = false;
	export let outline = false;
</script>

<div class:outline class:center={alignCenter} in:fly={{ y: 50, duration: 1000 }}>
	{#if title}
		<p>{title}</p>
	{/if}
	<slot />
</div>

<style lang="scss">
	div {
		margin-bottom: 24px;
		border-radius: 8px;
		padding: 16px;
		background-color: var(--secondary);
		&.center {
			display: flex;
			flex-direction: column;
			align-items: center;
		}

		&.outline {
			background-color: transparent;
			border: 2px solid var(--secondary);
		}

		p {
			margin: 0px 0 12px 0;
			font-weight: 400;
			font-size: 16px;
			line-height: 22px;
			color: var(--secondary);
		}
	}
</style>

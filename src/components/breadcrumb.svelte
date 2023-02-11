<script lang="ts">
	import Back from './icons/back.svelte';

	export let text: string = '';
	export let path: string = '/';
	export let sub: string = '';
</script>

<a href={path}>
	<div class="container">
		<Back size="24px" />
		<p>{text}</p>
		{#if sub}
			{sub}
		{/if}
		<span />
	</div>
</a>

<style>
	a {
		margin-bottom: 24px;
	}
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 0;
	}
	p {
		font-size: 24px;
		font-weight: 400;
		line-height: 32px;
		letter-spacing: 0em;
		color: var(--white-g);
		margin: 0;
	}
</style>

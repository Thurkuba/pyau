<script>
	import Header from 'src/components/layout/header.svelte';
	import Footer from 'src/components/layout/footer.svelte';
	import authStore from 'src/stores/authStore';
	import { layoutControl } from 'src/stores/layoutStore';

	$: header = $layoutControl.header;
	$: footer = $layoutControl.footer;
</script>

<Header back={header.back} large={header.large} />
<main>
	{#if $authStore.loaded}
		<slot />
	{:else}
		<p>carregando...</p>
	{/if}
</main>

<Footer footerControl={footer} />

<style lang="scss">
	main {
		width: 100%;
		flex: 1;
		box-sizing: border-box;
		background-color: var(--primary);
		overflow: var(--overflow-main);
		padding: 16px 32px;
		min-height: 300px;
		display: flex;
		flex-direction: column;
	}
</style>

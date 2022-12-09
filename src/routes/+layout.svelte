<script>
	import Header from 'src/components/layout/header.svelte';
	import Footer from 'src/components/layout/footer.svelte';
	import authStore from 'src/stores/authStore';
	// import { browser } from '$app/environment';
	// import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { layoutControl } from 'src/stores/layoutStore';

	let showHeader = true;

	$: header = $layoutControl.header;
	$: footer = $layoutControl.footer;

	$: pathname = $page.url.pathname;
	// $: if (browser && $authStore.loaded && !$authStore.isLoggedIn) goto('/');
	$: {
		if (pathname === '/educaindigena/memorias/add') showHeader = false;
		else showHeader = true;
	}
</script>

{#if showHeader}
	<Header back={header.back} large={header.large} />
{/if}
<main>
	{#if $authStore.loaded}
		<slot />
	{:else}
		<p>loading...</p>
	{/if}
</main>

{#if showHeader}
	<Footer footerControl={footer} />
{/if}

<style lang="scss">
	main {
		width: 100%;
		flex: 1;
		box-sizing: border-box;
		background-color: var(--primary);
		overflow: var(--overflow-main);
		padding: 16px 24px;
	}
</style>

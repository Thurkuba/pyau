<script>
	import Header from 'src/components/layout/header.svelte';
	import Footer from 'src/components/layout/footer.svelte';
	import authStore from 'src/stores/authStore';
	// import { browser } from '$app/environment';
	// import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let showHeader = true;

	$: pathname = $page.url.pathname;
	// $: if (browser && $authStore.loaded && !$authStore.isLoggedIn) goto('/');
	$: {
		if (pathname === '/educaindigena/memorias/add') showHeader = false;
		else showHeader = true;
	}
</script>

{#if showHeader}
	<Header back="" large />
{/if}
<main>
	{#if $authStore.loaded}
		<slot />
	{:else}
		<p>loading...</p>
	{/if}
</main>

{#if showHeader}
	<Footer actions={{ confirm: { texto: 'login', onclick: '/auth' } }} />
{/if}

<style lang="scss">
	main {
		width: 100%;
		height: calc(100% - var(--footer-h) - var(--header-h));
		box-sizing: border-box;
		background-color: var(--primary);
		overflow: var(--overflow-main);
		padding: 16px 24px;
	}
</style>

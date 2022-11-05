<script>
	import Header from '../components/header.svelte';
	import Footer from '../components/footer.svelte';
	import authStore from 'src/stores/authStore';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';

	let showHeader = true;

	$: pathname = $page.url.pathname;
	$: if (browser && $authStore.loaded && !$authStore.isLoggedIn) goto('/auth');
	$: {
		if (pathname === '/educaindigena/memorias/add') showHeader = false;
		else showHeader = true;
	}
</script>

{#if showHeader}
	<Header />
{/if}
<main>
	{#if $authStore.loaded}
		<slot />
	{:else}
		<p>loading...</p>
	{/if}
</main>

{#if showHeader}
	<Footer />
{/if}

<style lang="scss">
	main {
		/* width: 100%; */
		/* height: 100%; */
		overflow: hidden;
		padding: 12px 16px;
	}
</style>

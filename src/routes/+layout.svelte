<script>
	import Header from '../components/header.svelte';
	import Footer from '../components/footer.svelte';
	import authStore from 'src/stores/authStore';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import profileStore from 'src/stores/firestoreStore';

	$: if (browser && $authStore.loaded && !$authStore.isLoggedIn) goto('/auth');
	$: {
		switch ($profileStore.papel) {
			case 'prof':
				goto('/prof');
				break;
			case 'aluno':
				goto('/aluno');
				break;
			case 'educaindigena':
				goto('/educaindigena');
				break;
		}
	}
</script>

<Header />
<main>
	{#if $authStore.loaded}
		<slot />
	{:else}
		<p>loading...</p>
	{/if}
</main>
<Footer />

<style lang="scss">
	main {
		/* width: 100%; */
		height: 1000px;
		overflow: hidden;
		padding: 12px 16px;
	}
</style>

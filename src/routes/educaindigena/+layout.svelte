<script context="module">
	/** @type {import('@sveltejs/kit').Load} */
	export const load = async ({ url }) => ({ props: { url } });
</script>

<script>
	import profileStore from 'src/stores/profileStore';
	import PageTransition from 'src/components/pageTransition.svelte';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	export let url;

	$: if (browser && $profileStore.papel !== 'educaindigena') goto('/');
</script>

{#if $profileStore.papel == 'educaindigena'}
	<PageTransition {url}>
		<slot />
	</PageTransition>
{:else}
	redirecionando...
{/if}

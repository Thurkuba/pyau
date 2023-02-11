<script>
	import { profileStore } from 'src/stores/profileStore';
	import { getCards, memoStore } from 'src/stores/memoStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { layoutControl } from 'src/stores/layoutStore';
	import authStore from 'src/stores/authStore';

	layoutControl.setHeader({ large: false, back: '' });
	layoutControl.setFooter({ tipo: 'inicio' });

	$: noAuth = browser && $authStore.loaded && !$authStore.isLoggedIn;
	$: notProf = browser && $profileStore.loaded && $profileStore.papel !== 'prof';
	$: if (noAuth || notProf) goto('/');
	$: if (!$memoStore.loaded) getCards();
</script>

{#if !$profileStore.loaded}
	<p>carregando...</p>
{:else if $profileStore.papel == 'prof'}
	<slot />
{:else}
	redirecionando...
{/if}

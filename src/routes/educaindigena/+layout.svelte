<script>
	import { profileStore } from 'src/stores/profileStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	import { layoutControl } from 'src/stores/layoutStore';
	import authStore from 'src/stores/authStore';

	layoutControl.setHeader({ large: false, back: '' });
	layoutControl.setFooter({ tipo: 'inicio' });

	$: noAuth = browser && $authStore.loaded && !$authStore.isLoggedIn;
	$: notEduca = browser && $profileStore.loaded && $profileStore.papel !== 'educaindigena';
	$: if (noAuth || notEduca) goto('/');
</script>

{#if !$profileStore.loaded}
	<p>carregando...</p>
{:else if $profileStore.papel == 'educaindigena'}
	<slot />
{:else}
	<p>redirecionando...</p>
{/if}

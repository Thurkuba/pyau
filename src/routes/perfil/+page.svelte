<script>
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import authStore from 'src/stores/authStore';
	import { profileStore } from 'src/stores/profileStore';

	$: noAuth = browser && $authStore.loaded && !$authStore.isLoggedIn;
	$: noProfile = browser && $profileStore.loaded && !$profileStore.uid;
	$: if (noAuth || noProfile) goto('/');
</script>

{#if !$profileStore.loaded}
	<p>carregando...</p>
{:else}
	<h1>perfil</h1>
	<p>nome: {$profileStore.nome}</p>
	<p>papel: {$profileStore.papel}</p>
	<p>uid: {$profileStore.uid}</p>
{/if}

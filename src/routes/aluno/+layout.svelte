<script>
	import profileStore from 'src/stores/firestoreStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	$: if (browser && $profileStore.papel !== 'aluno') goto('/');
</script>

{#if $profileStore.papel == 'aluno'}
	<slot />
{:else}
	redirecionando...
{/if}

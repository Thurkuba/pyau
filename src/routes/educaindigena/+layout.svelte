<script>
	import profileStore from 'src/stores/firestoreStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	$: if (browser && $profileStore.papel !== 'educaindigena') goto('/');
</script>

{#if $profileStore.papel == 'educaindigena'}
	<slot />
{:else}
	redirecionando...
{/if}

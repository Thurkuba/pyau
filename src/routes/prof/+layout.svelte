<script>
	import { profileStore } from 'src/stores/profileStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	$: if (browser && $profileStore.papel !== 'prof') goto('/');
</script>

{#if $profileStore.papel == 'prof'}
	<slot />
{:else}
	redirecionando...
{/if}

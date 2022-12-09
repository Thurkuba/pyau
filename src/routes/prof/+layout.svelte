<script>
	import { profileStore } from 'src/stores/profileStore';
	import { getCards, memoStore } from 'src/stores/memoStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { layoutControl } from 'src/stores/layoutStore';

	layoutControl.setHeader({ large: false, back: '' });
	layoutControl.setFooter({ tipo: 'inicio' });

	$: if (browser && $profileStore.papel !== 'prof') goto('/');
	$: if (!$memoStore.loaded) getCards();
</script>

{#if $profileStore.papel == 'prof'}
	<slot />
{:else}
	redirecionando...
{/if}

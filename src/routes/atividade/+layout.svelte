<script>
	import { activityStore } from 'src/stores/activitiesStore';
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';

	// $: if (browser && $activityStore.loaded) goto('/');
</script>

{#if $activityStore.loaded}
	<slot />
{:else}
	carregando...
{/if}

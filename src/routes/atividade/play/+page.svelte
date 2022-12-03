<script>
	import { activityStore } from 'src/stores/activitiesStore';
	import MemoryGame from 'src/components/game/memoryGame.svelte';
</script>

{#if $activityStore.atividade.jogo === 'memoria'}
	<!-- content here -->
	<MemoryGame />
{/if}

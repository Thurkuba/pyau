<script>
	import Box from 'src/components/box.svelte';
	import { profileStore } from 'src/stores/profileStore';
	import CardGame from 'src/components/cardGame.svelte';
	import { activitiesStore, getActivities } from 'src/stores/activitiesStore';

	getActivities();
</script>

<h3>ka'aruju, {$profileStore.nome} !</h3>
<Box title="criar atividade">
	<CardGame path="/prof/criarAtividade" />
</Box>

<Box title="atividades passadas">
	{#if $activitiesStore.loaded}
		{#each $activitiesStore.atividades as atividade}
			<p>
				{atividade.pin} - {atividade.nome}
			</p>
		{/each}
	{/if}
</Box>

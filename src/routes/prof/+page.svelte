<script lang="ts">
	import Box from 'src/components/box.svelte';
	import CardGame from 'src/components/cardGame.svelte';
	import MiniCardActivity from 'src/components/miniCardActivity.svelte';
	import CardActivity from 'src/components/cardActivity.svelte';
	import { activitiesStore, getActivities } from 'src/stores/activitiesStore';
	import { profileStore } from 'src/stores/profileStore';
	import type { Atividade } from 'src/types/atividade';

	getActivities();

	let activityOpen = false;
	$: activityOpen;
	let atividadeProps: Atividade = {
		nome: 'yo',
		pin: '',
		completo: [],
		config: [],
		jogo: 'memoria',
		prof: '',
		timestamp: 0
	};

	const handleOpen = (event: CustomEvent) => {
		activityOpen = true;
		document.documentElement.style.setProperty('--overflow-main', 'hidden');
		const detail = event.detail;
		atividadeProps = detail.atividade;
		console.log('oia o click', event.detail);
	};

	const handleClose = () => {
		activityOpen = false;
		document.documentElement.style.setProperty('--overflow-main', 'auto');
	};
</script>

<h3>ka'aruju, {$profileStore.nome} !</h3>
<Box title="criar atividade">
	<CardGame path="/prof/criarAtividade" />
</Box>
{#if activityOpen}
	<CardActivity atividade={atividadeProps} on:close={handleClose} />
{/if}

<Box title="atividades passadas">
	{#if $activitiesStore.loaded}
		{#each $activitiesStore.atividades as atividade}
			<MiniCardActivity {atividade} on:click={handleOpen} />
		{/each}
	{/if}
</Box>

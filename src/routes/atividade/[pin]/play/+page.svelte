<script lang="ts">
	import MemoryGame from 'src/components/game/memoryGame.svelte';
	import { getCards, memoStore } from 'src/stores/memoStore';
	import type { PageData } from './$types';

	export let data: PageData;
	$: atividade = data.atividade;
	$: cartas = data.cartas;

	$: console.log(cartas);

	$: if (!$memoStore.loaded) getCards();
</script>

{#if atividade.jogo === 'memoria'}
	<MemoryGame pin={atividade.pin} {cartas} />
{/if}

<script lang="ts">
	import MemoryGame from 'src/components/game/memoryGame.svelte';
	import type { PageData } from './$types';

	export let data: PageData;
	$: atividade = data.atividade;
	$: cartas = data.cartas;
</script>

{#if atividade.jogo === 'memoria'}
	<MemoryGame pin={atividade.pin} {cartas} />
{/if}

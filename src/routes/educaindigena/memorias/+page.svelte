<script>
	import Breadcrumb from 'src/components/breadcrumb.svelte';
	import CardMemo from 'src/components/cardMemo.svelte';
	import { getCards, memoStore } from 'src/stores/memoStore';
	const breadcrumbItems = { text: 'Jogo das Memórias', path: '/educaindigena' };
	import { fly } from 'svelte/transition';
	getCards();
	console.log($memoStore);

	$: $memoStore.loaded;
</script>

<Breadcrumb {...breadcrumbItems} />
<p>todas as cartas:</p>

<div class="cartas">
	{#if $memoStore.loaded}
		{#each $memoStore.cartas as card}
			<CardMemo
				nomeguarani={card.nomeguarani}
				nomept={card.nomept}
				descricao={card.descricao}
				imagem={card.imagem}
			/>
		{/each}
	{/if}
</div>

<style>
	.cartas {
		display: flex;
		justify-content: space-between;
		padding: 12px;
	}
</style>

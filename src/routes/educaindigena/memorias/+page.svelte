<script>
	import Breadcrumb from 'src/components/breadcrumb.svelte';
	import CardMemo from 'src/components/cardMemo.svelte';
	import CardAdd from 'src/components/cardAdd.svelte';
	import { getCards, memoStore } from 'src/stores/memoStore';
	const breadcrumbItems = { text: 'Jogo das Memórias', path: '/educaindigena' };
	import { fly } from 'svelte/transition';

	// getCards();
	// $: $memoStore.loaded;
	$: if (!$memoStore.loaded) getCards();
</script>

<Breadcrumb {...breadcrumbItems} />
<p>todas as cartas:</p>

<div class="cartas">
	<CardAdd />
	{#if $memoStore.loaded}
		{#each $memoStore.cartas as card}
			<CardMemo nomeguarani={card.nomeguarani} nomept={card.nomept} />
		{/each}
	{/if}
</div>

<style>
	.cartas {
		display: flex;
		justify-content: left;

		flex-wrap: wrap;
		gap: 12px;
		padding: 12px;
	}
</style>

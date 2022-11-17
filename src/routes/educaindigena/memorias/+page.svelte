<script lang="ts">
	import Breadcrumb from 'src/components/breadcrumb.svelte';
	import MiniCardMemo from 'src/components/miniCardMemo.svelte';
	import CardMemo from 'src/components/cardMemo.svelte';
	import CardAdd from 'src/components/cardAdd.svelte';
	import { getCards, memoStore } from 'src/stores/memoStore';
	const breadcrumbItems = { text: 'Jogo das Memórias', path: '/educaindigena' };

	$: if (!$memoStore.loaded) getCards();

	let cardOpen = false;
	let props = {
		nomeguarani: '',
		nomept: '',
		descricao: '',
		imagem: '',
		id: ''
	};

	const handleOpen = (event: CustomEvent) => {
		cardOpen = true;
		const detail = event.detail;
		props = {
			nomeguarani: detail.nomeguarani,
			nomept: detail.nomept,
			descricao: detail.descricao,
			imagem: detail.imagem,
			id: detail.id
		};
	};

	const handleClose = () => {
		cardOpen = false;
	};
</script>

<Breadcrumb {...breadcrumbItems} />

{#if cardOpen}
	<CardMemo {...props} on:close={handleClose} />
{/if}
<p>todas as cartas:</p>

<div class="cartas">
	<CardAdd />
	{#if $memoStore.loaded}
		{#each $memoStore.cartas as card (card.id)}
			<MiniCardMemo
				nomeguarani={card.nomeguarani}
				nomept={card.nomept}
				descricao={card.descricao}
				imagem={card.imagem}
				id={card.id}
				on:click={handleOpen}
			/>
		{/each}
	{/if}
</div>

<style lang="scss">
	.cartas {
		display: flex;
		justify-content: left;

		flex-wrap: wrap;
		gap: 12px;
		padding: 12px;
	}
</style>

<script lang="ts">
	import Breadcrumb from 'src/components/breadcrumb.svelte';
	import MiniCardMemo from 'src/components/miniCardMemo.svelte';
	import CardMemo from 'src/components/modals/cardMemo.svelte';
	import CardAdd from 'src/components/cardAdd.svelte';
	import { getCards, memoStore } from 'src/stores/memoStore';
	import Box from 'src/components/box.svelte';
	import { goto } from '$app/navigation';
	const breadcrumbItems = { text: 'Jogo da Memória', path: '/educaindigena' };

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

	const handleEdit = () => {
		goto(`/educaindigena/memorias/edit/${props.id}`);
	};
</script>

<Breadcrumb {...breadcrumbItems} />

{#if cardOpen}
	<CardMemo {...props} on:submit={handleEdit} on:close={handleClose} />
{/if}

<Box outline title="todas as cartas">
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
</Box>

<style lang="scss">
	.cartas {
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
		place-items: center;
		grid-gap: 1rem;
		padding: 12px;
	}
</style>

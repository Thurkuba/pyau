<script lang="ts">
	import MiniCardMemo from 'src/components/miniCardMemo.svelte';
	import { memoStore } from 'src/stores/memoStore';
	import { createActivity, deleteActivity, editActivity } from 'src/stores/activitiesStore';
	import type { Atividade } from 'src/types/atividade';
	import { goto } from '$app/navigation';
	import Box from 'src/components/box.svelte';
	import Breadcrumb from 'src/components/breadcrumb.svelte';
	import Remove from 'src/components/icons/remove.svelte';
	import ConfirmDel from 'src/components/modals/confirmDel.svelte';
	import { doc, getDoc } from 'firebase/firestore';
	import { db } from 'src/lib/services/firebase';
	import { page } from '$app/stores';

	$: cardsLen = $memoStore.cartas.length;
	$: selectedCards = new Array(cardsLen).fill(false);
	$: cartas = $memoStore.cartas;

	let atividade: Atividade = {
		nome: '',
		jogo: 'memoria',
		config: [],
		completo: [],
		pin: '',
		timestamp: 0,
		prof: ''
	};

	$: id = $page.params.id;

	const getData = async () => {
		const cardDoc = doc(db, 'atividades', id);
		const cardSnap = await getDoc(cardDoc);
		if (cardSnap.exists()) {
			const data = cardSnap.data();
			atividade = {
				nome: data.nome,
				jogo: 'memoria',
				config: data.config,
				completo: data.completo,
				pin: data.pin,
				timestamp: data.timestamp,
				prof: data.prof
			};
			selectedCards = cartas.map((card) => atividade.config.includes(card.id));
		} else {
			console.log('No such document!');
		}
	};

	const cardsFilter = () => {
		const filtro = cartas.filter((_, i) => selectedCards[i]);
		const cardsIds = filtro.map((card) => card.id);
		atividade.config = cardsIds;

		return cardsIds;
	};

	const handleSubmit = async () => {
		cardsFilter();
		const newConfig = selectedCards
			.map((card, i) => (card ? cartas[i].id : null))
			.filter((card) => card !== null) as string[];
		await editActivity(id, { ...atividade, config: newConfig });
		goto('/prof');
	};

	let openDel = false;
	const handleOpenDel = () => {
		openDel = true;
	};

	$: num = selectedCards.filter((card) => card).length;

	$: valid = num >= 3 && num <= 6 && !!atividade.nome;

	const handleDel = async () => {
		await deleteActivity(id);
		openDel = false;
		goto('/educaindigena/memorias');
	};

	const breadcrumbItems = { text: 'criar atividade', path: '/prof' };
</script>

<Breadcrumb {...breadcrumbItems} />

<input placeholder="nome da atividade" type="text" bind:value={atividade.nome} />

<Box outline title={`selecionar cartas (3-6): ${num}`}>
	{#await getData()}
		<p>Carregando...</p>
	{:then}
		<form>
			{#if $memoStore.loaded}
				{#each $memoStore.cartas as card, i}
					<label class:selected={selectedCards[i]}>
						<MiniCardMemo
							nomeguarani={card.nomeguarani}
							nomept={card.nomept}
							descricao={card.descricao}
							imagem={card.imagem}
							id={card.id}
						/>
						<input type="checkbox" bind:checked={selectedCards[i]} />
					</label>
				{/each}
			{/if}
		</form>
	{:catch error}
		<p>{error.message}</p>
	{/await}
</Box>

<div class="btns">
	<button class="delete" on:click={handleOpenDel}><Remove /></button>
	<button disabled={!valid} class="open" on:click={handleSubmit}>salvar mudanças</button>
</div>

{#if openDel}
	<ConfirmDel on:close={() => (openDel = false)} on:submit={handleDel} />
{/if}

<style lang="scss">
	form {
		display: flex;
		justify-content: left;
		display: grid;
		grid-template-columns: repeat(auto-fill, minmax(60px, 1fr));
		grid-gap: 12px;
		place-items: center;
		padding: 12px;
	}
	input {
		@include text-input;
		&[type='checkbox'] {
			display: none;
		}
	}
	.selected {
		border: 2px solid var(--danger);
		border-radius: 8px;
	}

	button {
		@include simple-button($filled: true, $shadow: true);
	}

	.btns {
		display: flex;
		justify-content: space-between;
		margin-top: 24px;

		.open {
			width: 75%;
		}
		.delete {
			width: 20%;
			background-color: var(--danger);
			border: 1px solid var(--danger);
		}
	}
</style>

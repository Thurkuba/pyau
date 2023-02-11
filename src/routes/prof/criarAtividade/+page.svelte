<script lang="ts">
	import MiniCardMemo from 'src/components/miniCardMemo.svelte';
	import { memoStore } from 'src/stores/memoStore';
	import { createActivity } from 'src/stores/activitiesStore';
	import type { Atividade } from 'src/types/atividade';
	import { goto } from '$app/navigation';
	import Box from 'src/components/box.svelte';
	import Breadcrumb from 'src/components/breadcrumb.svelte';

	$: cardsLen = $memoStore.cartas.length;
	$: selectedCards = new Array(cardsLen).fill(false);
	$: cartas = $memoStore.cartas;

	const random: string = Math.random().toString(16).substring(2, 8);

	let atividade: Atividade = {
		nome: '',
		jogo: 'memoria',
		config: [],
		completo: [],
		pin: random,
		timestamp: Date.now(),
		prof: ''
	};

	const cardsFilter = () => {
		const filtro = cartas.filter((_, i) => selectedCards[i]);
		const cardsIds = filtro.map((card) => card.id);
		console.log('acabei', cardsIds);
		atividade.config = cardsIds;

		return cardsIds;
	};

	const handleSubmit = async () => {
		cardsFilter();
		await createActivity(atividade);
		goto('/');
	};

	$: num = selectedCards.filter((card) => card).length;

	$: valid = num >= 3 && num <= 6 && !!atividade.nome;

	const breadcrumbItems = { text: 'criar atividade', path: '/prof' };
</script>

<Breadcrumb {...breadcrumbItems} />

<input placeholder="nome da atividade" type="text" bind:value={atividade.nome} />

<Box outline title={`selecionar cartas (3-6): ${num}`}>
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
</Box>

<button disabled={!valid} on:click={handleSubmit}>criar atividade</button>

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
</style>

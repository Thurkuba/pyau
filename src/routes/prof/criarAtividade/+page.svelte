<script lang="ts">
	import MiniCardMemo from 'src/components/miniCardMemo.svelte';
	import { memoStore } from 'src/stores/memoStore';
	import { createActivity } from 'src/stores/activitiesStore';
	import type { Atividade } from 'src/types/atividade';
	import { goto } from '$app/navigation';

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
</script>

<h2>criar atividade</h2>

<form>
	<label for="text">
		título da atividade
		<input type="text" bind:value={atividade.nome} placeholder="título" />
	</label>
	<label for="text">
		selecione as cartas

		<div class="cartas">
			{#if $memoStore.loaded}
				{#each $memoStore.cartas as card, i}
					<label for="check">
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
		</div>
	</label>
</form>

<!-- {selectedCards} -->
<button on:click={handleSubmit}>criar</button>

<style>
	.cartas {
		display: flex;
		justify-content: left;

		flex-wrap: wrap;
		gap: 12px;
		padding: 12px;
	}
</style>

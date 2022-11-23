<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import type { Atividade } from 'src/stores/activitiesStore';
	import { getCards, memoStore } from 'src/stores/memoStore';
	import { goto } from '$app/navigation';
	import addIcon from '$lib/assets/addIcon.png';
	import Close from 'src/components/close.svelte';
	import MiniCardMemo from './miniCardMemo.svelte';
	import Button from './button.svelte';
	import { each } from 'svelte/internal';

	$: if (!$memoStore.loaded) getCards();
	$: cardsLen = $memoStore.cartas.length;
	$: selectedCards = new Array(cardsLen).fill(false);
	$: cartas = $memoStore.cartas;

	console.log($memoStore.mapCarta);
	export let atividade: Atividade;

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('close');
	};

	const handleSubmit = () => {
		dispatch('submit');
		handleClose();
		// goto('/educaindigena/memorias');
	};
	// const handleDelete = async (e: Event) => {
	// 	e.preventDefault();
	// 	await deleteCard(id);
	// 	handleClose();
	// };
</script>

<div class="popup" transition:fade={{ duration: 500 }}>
	<div class="container">
		<Close on:close />
		<div class="card">
			<div class="text-container">
				<h2>
					{atividade.nome}
				</h2>
				<p>
					jogo: {atividade.jogo}
				</p>

				<p>
					pin: {atividade.pin}
				</p>

				<p>cartas:</p>
				<div class="cartas">
					{#each atividade.config as cardId}
						<MiniCardMemo
							nomeguarani={$memoStore.mapCarta[cardId].nomeguarani}
							nomept={$memoStore.mapCarta[cardId].nomept}
							descricao={$memoStore.mapCarta[cardId].descricao}
							imagem={$memoStore.mapCarta[cardId].imagem}
							id={$memoStore.mapCarta[cardId].id}
						/>
					{/each}
				</div>
				<div class="completo">
					completo: {atividade.completo}
				</div>
			</div>
		</div>
	</div>

	<div class="popupoutside" on:click={handleClose} />
</div>

<style lang="scss">
	.container {
		border: 1px solid transparent;
		width: 80vw;
		height: 70vh;
		border-radius: 8px;
		background-color: white;
		z-index: 2;
	}
	.cartas {
		display: flex;
		justify-content: left;

		flex-wrap: wrap;
		gap: 12px;
		padding: 12px;
	}
	.card {
		padding: 0 16px 16px 16px;
	}
	h2 {
		margin-bottom: 12px;
	}
	.btn-container {
		width: 100%;
		margin: 20px 0 0 0;
		display: flex;
		justify-content: right;
		gap: 8px;
	}
	.popup {
		position: absolute;
		height: 100%;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;

		.popupoutside {
			width: 100%;
			height: 100vh;
			position: absolute;
			background-color: black;
			opacity: 60%;
		}
	}
</style>

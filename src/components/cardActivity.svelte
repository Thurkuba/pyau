<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import type { Atividade } from 'src/types/atividade';
	import { getCards, memoStore } from 'src/stores/memoStore';
	// import { goto } from '$app/navigation';
	// import addIcon from '$lib/assets/addIcon.png';
	import MiniCardMemo from './miniCardMemo.svelte';
	import { clickOutside } from 'src/lib/actions/clickOutside';
	import Close from 'src/components/icons/close.svelte';
	import Sol from './icons/sol.svelte';
	import Menu from './icons/menu.svelte';
	// import Button from './button.svelte';
	// import { each } from 'svelte/internal';

	$: if (!$memoStore.loaded) getCards();
	// $: cardsLen = $memoStore.cartas.length;
	// $: selectedCards = new Array(cardsLen).fill(false);
	// $: cartas = $memoStore.cartas;

	export let atividade: Atividade;

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		console.log('cloooose');
		dispatch('close');
	};

	// const handleSubmit = () => {
	// 	dispatch('submit');
	// 	handleClose();
	// goto('/educaindigena/memorias');
	// };
	// const handleDelete = async (e: Event) => {
	// 	e.preventDefault();
	// 	await deleteCard(id);
	// 	handleClose();
	// };
</script>

<div class="overlay" transition:fade={{ duration: 500 }}>
	<div use:clickOutside on:outclick={handleClose} class="container">
		<div class="header">
			<div />
			<Sol size="30px" />
			<Close size="20px" color="var(--secondary)" on:click={handleClose} on:keyup={handleClose} />
		</div>
		<div class="card">
			<div class="menu">
				<Menu size="20px" />
			</div>

			<h2>
				{atividade.nome}
			</h2>

			<p class="pin">{atividade.pin}</p>

			<p>cartas do jogo:</p>
			<div class="cartas">
				{#each atividade?.config ?? [] as cardId}
					<MiniCardMemo
						nomeguarani={$memoStore.mapCarta[cardId].nomeguarani}
						nomept={$memoStore.mapCarta[cardId].nomept}
						descricao={$memoStore.mapCarta[cardId].descricao}
						imagem={$memoStore.mapCarta[cardId].imagem}
						id={$memoStore.mapCarta[cardId].id}
					/>
				{:else}
					<p style="text-align: center">Nenhuma carta foi escolhida</p>
				{/each}
			</div>

			<p>completo:</p>
			<div class="completo">
				{#each atividade?.completo ?? [] as estudante}
					<div class="estudante">
						<p>{estudante}</p>
					</div>
				{:else}
					<p style="text-align: center">Ninguém fez a esta atividade ainda</p>
				{/each}
			</div>
		</div>
	</div>
</div>

<style lang="scss">
	.overlay {
		z-index: zidx(overlay);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #00000099;

		.container {
			background: var(--primary);
			border: 1px solid var(--secondary);
			border-radius: 8px;
			width: 80vw;
			height: 70vh;
			padding: 16px;
			z-index: zidx(modal);
			display: flex;
			flex-direction: column;
			color: var(--white-g);

			.header {
				display: flex;
				align-items: center;
				justify-content: space-between;
				margin-bottom: 16px;
			}

			.card {
				border: 1px solid var(--secondary);
				border-radius: 8px;
				padding: 16px 24px;
				flex: 1;
				overflow: auto;

				.menu {
					text-align: right;
				}
				h2 {
					font-weight: 400;
					font-size: 20px;
					line-height: 27px;
					margin-bottom: 12px;
					text-align: center;
					margin: 0;
				}
				p {
					margin: 0;
					margin-bottom: 12px;
					font-weight: 400;
					font-size: 16px;
					line-height: 22px;
					&.pin {
						text-align: center;
						margin-bottom: 20px;
					}
				}
				.cartas {
					display: flex;
					justify-content: left;

					flex-wrap: wrap;
					gap: 12px;
					padding: 12px;
				}
				.completo {
					.estudante {
						padding: 16px;
						background-color: var(--secondary);
						border-radius: 8px;
						margin-bottom: 8px;
						p {
							margin: 0;
							font-weight: 400;
							font-size: 16px;
							line-height: 22px;
						}
					}
				}
			}
		}
	}
</style>

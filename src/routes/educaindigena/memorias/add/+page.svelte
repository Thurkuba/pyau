<script lang="ts">
	import closeIcon from '$lib/assets/closeIcon.png';
	import { createCard } from 'src/stores/memoStore';
	import type { Carta } from 'src/stores/memoStore';
	import CardMemo from 'src/components/cardMemo.svelte';
	import Button from 'src/components/button.svelte';

	let cartaData: Carta = {
		nomeguarani: '',
		nomept: '',
		descricao: '',
		imagem: ''
	};

	let open = false;
	const handleOpen = async (e: Event) => {
		e.preventDefault();
		open = true;
	};

	const handleSubmit = async (e: Event) => {
		// e.preventDefault();
		console.log('criando carta', cartaData);
		await createCard(cartaData);
	};

	const handleClose = () => {
		open = false;
	};
</script>

{#if open}
	<CardMemo {...cartaData} submit={true} on:close={handleClose} on:submit={handleSubmit} />
{/if}

<div class="container">
	<div class="close">
		<a href="/educaindigena/memorias">
			<img src={closeIcon} alt="ícone de fechar" />
		</a>
	</div>

	<form on:submit={handleOpen}>
		<label for="text">
			nome da carta (guarani)
			<input type="text" bind:value={cartaData.nomeguarani} />
		</label>
		<label for="text">
			nome da carta (português)
			<input type="text" bind:value={cartaData.nomept} />
		</label>
		<label for="text">
			descrição
			<input type="text" bind:value={cartaData.descricao} />
		</label>
		<label for="text">
			imagem
			<input type="text" bind:value={cartaData.imagem} />
		</label>

		<div class="btn-container">
			<Button text="criar carta" on:click={handleOpen} />
		</div>
	</form>
</div>

<style lang="scss">
	.close {
		display: flex;
		align-items: center;
		height: 60px;

		img {
			width: 20px;
			height: 20px;
		}
	}
</style>

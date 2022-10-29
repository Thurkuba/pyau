<script lang="ts">
	import closeIcon from '$lib/assets/closeIcon.png';
	import { createCard } from 'src/stores/memoStore';
	import type { Carta } from 'src/stores/memoStore';

	let cartaData: Carta = {
		nomeguarani: '',
		nomept: '',
		descricao: '',
		imagem: ''
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		console.log('tentando criar carta', cartaData);
		await createCard(cartaData);
	};
</script>

<div class="container">
	<div class="close">
		<a href="/educaindigena/memorias">
			<img src={closeIcon} alt="ícone de fechar" />
		</a>
	</div>

	<form on:submit={handleSubmit}>
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

		<button type="submit">criar carta</button>
	</form>
</div>

<style lang="scss">
	.container {
	}

	.close {
		display: flex;
		align-items: center;
		height: 60px;

		img {
			width: 20px;
			height: 20px;
		}
	}
	label {
		margin: 8px 0;
	}
	input {
		display: block;
		border: 0;
		border-bottom: 1px solid black;
		margin: 8px 0 12px;
	}
</style>

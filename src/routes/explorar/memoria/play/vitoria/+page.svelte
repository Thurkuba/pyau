<script lang="ts">
	import CardMemo from 'src/components/modals/cardMemo.svelte';

	import { layoutControl } from 'src/stores/layoutStore';
	import type { Carta } from 'src/types/memoria';
	import type { PageData } from './$types';

	export let data: PageData;
	$: cartas = data.cartas;

	let selecionada: Carta | undefined;

	layoutControl.setFooter({
		tipo: 'duplo',
		btn1: { texto: 'jogar novamente', efeito: '/explorar/memoria', sombra: true },
		btn2: { texto: 'ir para home', efeito: '/', sombra: true }
	});
</script>

<h1>parabéns!</h1>
<p>Você completou o Jogo da Memória</p>
<p>Agradecemos pela sua dedicação e esperamos que tenha se divertido !</p>
<p>Caso queira ver novamente as cartas, basta tocá-las</p>
<p>Até logo o/</p>

<div class="cartas">
	{#each cartas as carta}
		<div
			class="carta"
			on:click={() => (selecionada = carta)}
			on:keyup={() => (selecionada = carta)}
		>
			<img src={carta.imagem} alt={carta.nomeguarani} />
		</div>
	{/each}
</div>

{#if selecionada}
	<CardMemo on:close={() => (selecionada = undefined)} {...selecionada} />
{/if}

<style lang="scss">
	h1 {
		font-weight: 400;
		font-size: 32px;
		line-height: 43px;
		color: var(--white-g);
		margin: 0;
		margin-bottom: 10px;
	}
	p {
		font-weight: 400;
		font-size: 20px;
		line-height: 27px;
		color: var(--white-g);
	}
	.cartas {
		display: flex;
		flex-wrap: nowrap;
		overflow-x: auto;
		overflow-y: hidden;
		.carta {
			width: 60px;
			height: 70px;
			margin-right: 24px;
			flex-shrink: 0;
			border-radius: 8px;
			overflow: hidden;
			img {
				height: 100%;
				width: 100%;
			}
		}
	}
</style>

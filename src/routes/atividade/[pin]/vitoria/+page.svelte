<script lang="ts">
	import { goto } from '$app/navigation';

	import MiniCardMemo from 'src/components/miniCardMemo.svelte';
	import CardMemo from 'src/components/modals/cardMemo.svelte';
	import { content } from 'src/stores/anonymousStore';

	import type { PageData } from './$types';

	export let data: PageData;
	$: atividade = data.atividade;
	$: cartas = data.cartas;

	let cardOpen = false;
	let modalProps = {
		nomeguarani: '',
		nomept: '',
		descricao: '',
		imagem: '',
		id: ''
	};
	const handleOpen = (event: CustomEvent) => {
		cardOpen = true;
		const detail = event.detail;
		modalProps = {
			nomeguarani: detail.nomeguarani,
			nomept: detail.nomept,
			descricao: detail.descricao,
			imagem: detail.imagem,
			id: detail.id
		};
	};
</script>

<h1>parabéns!</h1>
<p>{$content},</p>
<p>você completou a atividade "{atividade.nome}"</p>
<p>Agradecemos pela sua dedicação e esperamos que tenha se divertido !</p>
<p>Seu nome será enviado à lista de pessoas que completaram esta tarefa.</p>
<p>Caso queira ver novamente as cartas, basta tocá-las</p>
<p>Até logo o/</p>
<div>
	{#each cartas as carta}
		<MiniCardMemo on:click={handleOpen} {...carta} />
	{/each}
</div>
<button class="more" on:click={() => goto('/explorar')}> jogar mais </button>
<button class="back" on:click={() => goto('/')}> ir para home </button>

{#if cardOpen}
	<CardMemo {...modalProps} on:close={() => (cardOpen = false)} />
{/if}

<style lang="scss">
	h1,
	p {
		color: var(--white-g);
		font-weight: 400;
		letter-spacing: 0em;
		text-align: left;
		margin: 0;
	}
	h1 {
		font-size: 32px;
		line-height: 43px;
		margin-bottom: 16px;
	}
	p {
		font-size: 20px;
		line-height: 27px;
		margin-bottom: 16px;
	}
	div {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		gap: 16px;
	}
	.more {
		@include simple-button($filled: true, $shadow: true);
		margin-top: 24px;
	}
	.back {
		@include simple-button;
		margin-top: 12px;
	}
</style>

<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from 'src/lib/actions/clickOutside';

	import CardMemoContent from './cardMemoContent.svelte';
	import CardMemoSuccess from './cardMemoSuccess.svelte';

	export let nomeguarani: string;
	export let nomept: string;
	export let descricao: string;
	export let imagem: string;
	export let id: string;
	export let criar = false;
	export let sucesso = false;

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('close');
	};

	const handleSubmit = () => {
		dispatch('submit');
	};
</script>

<div class="overlay" transition:fade={{ duration: 500 }}>
	<div use:clickOutside on:outclick={handleClose} class="container">
		{#if sucesso}
			<CardMemoSuccess {nomeguarani} {nomept} {imagem} {handleClose} />
		{:else}
			<CardMemoContent
				{id}
				{nomeguarani}
				{nomept}
				{descricao}
				{imagem}
				{criar}
				{handleClose}
				{handleSubmit}
			/>
		{/if}
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
			padding: 24px 16px;
			z-index: zidx(modal);
			display: flex;
			flex-direction: column;
			color: var(--white-g);
		}
	}
</style>

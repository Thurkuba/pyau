<script lang="ts">
	import Back from '../icons/back.svelte';

	export let id = '';
	export let nomeguarani: string;
	export let nomept: string;
	export let descricao: string;
	export let imagem: string;
	export let criar = false;
	export let handleClose: () => void;
	export let handleSubmit: () => void;
</script>

<div class="card">
	<h2>
		{nomeguarani} ({nomept})
	</h2>
	<div class="div-img">
		<img src={imagem} alt="imagem" />
	</div>
	<p>{descricao}</p>
</div>
{#if id}
	<div class="btns">
		<button class="back" on:click={handleClose}><Back /></button>
		<button on:click={handleSubmit}>editar</button>
	</div>
{:else if criar}
	<div class="btns">
		<button class="back" on:click={handleClose}><Back /></button>
		<button on:click={handleSubmit}>confirmar</button>
	</div>
{:else}
	<button on:click={handleClose}>o/</button>
{/if}

<style lang="scss">
	.card {
		border: 1px solid var(--secondary);
		border-radius: 8px;
		padding: 16px 24px;
		display: flex;
		flex-direction: column;
		align-items: center;
		flex: 1;
		overflow: auto;

		.div-img {
			height: 160px;
			max-width: 60vw;
			border: 4px solid var(--secondary);
			border-radius: 8px;
			img {
				height: 100%;
				width: 100%;
				border-radius: 8px;
				object-fit: cover;
			}
		}
		h2 {
			font-size: 24px;
			font-weight: 400;
			line-height: 32px;
			letter-spacing: 0em;
			color: var(--white-g);
			margin: 0 0 16px 0;
		}
		p {
			font-size: 18px;
			font-weight: 400;
			line-height: 24px;
			letter-spacing: 0em;
			text-align: left;
			margin: 0;
			margin-top: 16px;
			width: 100%;
		}
	}
	.btns {
		display: flex;
		justify-content: space-between;
	}
	button {
		@include simple-button($filled: true, $shadow: true);
		margin: auto;
		margin-top: 16px;
		width: 75%;
		&.back {
			@include simple-button;
			width: 15%;
		}
	}
</style>

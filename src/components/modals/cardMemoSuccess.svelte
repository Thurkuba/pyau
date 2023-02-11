<script lang="ts">
	import Sol from '../icons/sol.svelte';

	export let nomeguarani: string;
	export let nomept: string;
	export let imagem: string;
	export let handleClose: () => void;
</script>

<div class="sun">
	<Sol size="125px" />
</div>
<div class="card">
	<h2>
		{nomeguarani} ({nomept})
	</h2>
	<div class="div-img">
		<img src={imagem} alt="imagem" />
	</div>
</div>
<p>Carta criada com sucesso!</p>
<button on:click={handleClose}>confirmar</button>

<style lang="scss">
	.sun {
		margin: 0 auto 32px auto;
	}
	.card {
		width: 60%;
		margin: auto;
		margin-bottom: 32px;
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
	}
	button {
		@include simple-button($filled: true, $shadow: true);
		margin: auto;
		margin-top: 16px;
		width: 85%;
	}
	p {
		font-size: 18px;
		font-weight: 400;
		line-height: 24px;
		letter-spacing: 0em;
		text-align: center;
		margin: auto;
		margin-bottom: 12px;
		width: 100%;
	}
</style>

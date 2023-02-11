<script lang="ts">
	import Cartas from './icons/cartas.svelte';
	export let path: string;
	export let subtexto = 'jogo da';
	export let texto = 'Memória';
</script>

<a href={path}>
	<p>{subtexto}</p>
	<h1>{texto}</h1>
	<div class="icon">
		<Cartas size="42px" color="var(--secondary)" fill="var(--primary)" />
	</div>
</a>

<style lang="scss">
	a {
		margin-left: 24px;
		position: relative;
		background-color: var(--secondary);
		padding: 8px 12px;

		display: flex;
		flex-direction: column;

		width: 122px;
		height: 121px;

		background: #9ac992;
		box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
		border-radius: 8px;

		p,
		h1 {
			margin: 0;
			font-weight: 400;
			color: #ffffff;
		}
		p {
			font-size: 12px;
			line-height: 16px;
		}
		h1 {
			font-size: 24px;
			line-height: 32px;
		}

		.icon {
			position: absolute;
			bottom: 8px;
			right: 8px;
		}
	}
</style>

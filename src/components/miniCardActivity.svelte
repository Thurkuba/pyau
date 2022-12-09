<script lang="ts">
	import type { Atividade } from 'src/types/atividade';
	import { createEventDispatcher } from 'svelte';

	export let atividade: Atividade;

	const dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('click', { atividade });
	};
</script>

<a class="container" href={'#'} on:click|preventDefault={handleClick}>
	<p>{atividade.nome}</p>
	<p class="pin">{atividade.pin}</p>
</a>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		padding: 12px 16px;

		background: var(--secondary);
		border-radius: 8px;

		margin-bottom: 8px;
		p {
			margin: 0;
			font-weight: 400;
			font-size: 16px;
			line-height: 22px;
			color: var(--white-g);
			&.pin {
				font-size: 20px;
				line-height: 27px;
			}
		}
	}
</style>

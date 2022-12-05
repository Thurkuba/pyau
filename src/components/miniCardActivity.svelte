<script lang="ts">
	import type { Atividade } from 'src/stores/activitiesStore';
	import { createEventDispatcher } from 'svelte';
	export let atividade: Atividade;

	const dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('click', {
			atividade
		});
	};
</script>

<div class="container" on:keyup={handleClick} on:click={handleClick}>
	<p>{atividade.nome} - {atividade.pin}</p>
</div>

<style lang="scss">
	.container {
		border-radius: 4px;
		background-color: white;
		padding: 2px 8px;
		margin: 2px;
	}
</style>

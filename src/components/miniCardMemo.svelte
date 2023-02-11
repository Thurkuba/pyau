<script lang="ts">
	import { fly } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';

	export let nomeguarani: string;
	export let nomept: string;
	export let descricao: string;
	export let imagem: string;
	export let id: string;

	const dispatch = createEventDispatcher();

	const handleClick = () => {
		dispatch('click', {
			nomeguarani: nomeguarani,
			nomept: nomept,
			descricao: descricao,
			imagem: imagem,
			id: id
		});
	};
</script>

<div
	class="container-mini"
	in:fly={{ y: 100, duration: 1500 }}
	on:keyup={handleClick}
	on:click={handleClick}
>
	<img src={imagem} alt={nomeguarani} />
</div>

<style lang="scss">
	.container-mini {
		border: 1px solid black;
		width: 60px;
		height: 80px;
		border: 1px solid var(--secondary);
		border-radius: 8px;
		cursor: pointer;
		overflow: hidden;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
</style>

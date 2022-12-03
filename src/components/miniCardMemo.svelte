<script lang="ts">
	import { fly } from 'svelte/transition';
	import CardMemo from 'src/components/cardMemo.svelte';
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

<div class="container-mini" in:fly={{ y: 100, duration: 1500 }} on:click={handleClick}>
	<img src={imagem} alt={nomeguarani} />
	<p>
		{nomeguarani}
	</p>
	<p>
		{nomept}
	</p>
</div>

<style>
	.container-mini {
		border: 1px solid black;
		width: 60px;
		height: 70px;
		border-radius: 8px;
		cursor: pointer;
		overflow: hidden;
	}
	p {
		margin: 4px;
		text-align: center;
	}
</style>

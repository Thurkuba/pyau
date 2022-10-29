<script lang="ts">
	import { fly } from 'svelte/transition';

	export let nomeguarani: string;
	export let nomept: string;
	// export let descricao: string;
	// export let imagem: string;
</script>

<a href="/educaindigena/memorias/{nomeguarani}">
	<div class="container" in:fly={{ y: 100, duration: 1500 }}>
		<p>
			{nomeguarani}
		</p>
		<p>
			{nomept}
		</p>
	</div>
</a>

<style>
	.container {
		border: 1px solid black;
		width: 64px;
		height: 64px;
		border-radius: 8px;
	}
	p {
		margin: 4px;
		text-align: center;
	}
</style>

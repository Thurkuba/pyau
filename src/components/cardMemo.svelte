<script lang="ts">
	export let nomeguarani: string;

	export let nomept: string;

	export let descricao: string;

	export let imagem: string;
</script>

<div class="container">{nomeguarani}{nomept}{descricao}{imagem}</div>

<style>
	.container {
		border: 1px solid black;
		/* width: 64px; */
		/* height: 64px; */
		border-radius: 8px;
	}
</style>

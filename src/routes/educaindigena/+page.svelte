<script>
	import Box from 'src/components/box.svelte';
	import profileStore from 'src/stores/firestoreStore';
	import CardGame from 'src/components/cardGame.svelte';
</script>

<h3>ka'aruju, {$profileStore.nome} !</h3>

<Box>
	<p>criar conteúdo</p>
	<CardGame />
	<!-- <img src="cardMemorias2.png" alt="jogo das memórias" /> -->
</Box>

<style lang="scss">
	img {
		width: 120px;
		height: 120px;
		transition: ease-in-out 0.2s;

		&:hover {
			transform: scale(1.05);
		}
	}
</style>

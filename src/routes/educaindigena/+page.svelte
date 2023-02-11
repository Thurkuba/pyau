<script>
	import Box from 'src/components/box.svelte';
	import { profileStore } from 'src/stores/profileStore';
	import CardGame from 'src/components/cardGame.svelte';
</script>

<h1>ka'aruju, {$profileStore.nome} !</h1>

<Box outline title="criar">
	<CardGame texto="Carta" subtexto="jogo da memória" path="/educaindigena/memorias" />
</Box>

<style lang="scss">
	h1 {
		font-size: 20px;
		font-weight: 400;
		line-height: 27px;
		letter-spacing: 0em;
		color: var(--white-g);
		text-align: center;
		margin: 16px auto 32px auto;
	}
</style>

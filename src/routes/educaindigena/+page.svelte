<script>
	import Box from 'src/components/box.svelte';
	import profileStore from 'src/stores/profileStore';
	import CardGame from 'src/components/cardGame.svelte';
</script>

<h3>ka'aruju, {$profileStore.nome} !</h3>

<Box title="criar conteúdo">
	<CardGame />
</Box>

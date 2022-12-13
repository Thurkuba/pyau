<script lang="ts">
	import Box from 'src/components/box.svelte';
	import CardGame from 'src/components/cardGame.svelte';
	import { layoutControl } from 'src/stores/layoutStore';

	layoutControl.setHeader({ large: false, back: '' });
	layoutControl.setFooter({ tipo: 'inicio' });
</script>

<p>olá,</p>
<p>valorizamos a cultura dos povos indígenas do Brasil por meio de atividades digitais.</p>
<p>
	os jogos da plataforma são meios de se preservar as histórias e características conheça diferentes
	etnias
</p>

<Box outline title="jogos">
	<CardGame path="/explorar/memoria" />
</Box>

<style lang="scss">
	p {
		font-weight: 400;
		font-size: 20px;
		line-height: 27px;
		color: var(--white-g);
	}
</style>

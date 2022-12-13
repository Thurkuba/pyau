<script lang="ts">
	import { layoutControl } from 'src/stores/layoutStore';

	layoutControl.setFooter({
		tipo: 'simples',
		btn1: { back: '/explorar', texto: 'jogar', efeito: '/explorar/memoria/play', sombra: true }
	});
</script>

<p>você chegou ao jogo das memórias!</p>
<p>Aqui, cada carta do jogo representa um elemento da cultura guarani mbyá</p>
<p>Encontre duas cartas iguais para achar as memórias!</p>

<style lang="scss">
	p {
		font-weight: 400;
		font-size: 20px;
		line-height: 27px;
		color: var(--white-g);
		margin: 0;
		margin-bottom: 32px;
		padding: 0 12px;
	}
</style>

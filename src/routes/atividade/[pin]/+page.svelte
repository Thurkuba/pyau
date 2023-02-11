<script lang="ts">
	import { content } from 'src/stores/anonymousStore';
	import type { PageData } from './$types';

	export let data: PageData;
	$: atividade = data.atividade;
</script>

<h1>atividade: {atividade.nome}</h1>
<p>
	jogo: {atividade.jogo}
</p>

<label for="text">
	como podemos te chamar?
	<input bind:value={$content} placeholder="Qual seu nome?" />
</label>

<a href={`/atividade/${atividade.pin}/play`}>continuar</a>

<style lang="scss">
	h1 {
		font-size: 20px;
		font-weight: 400;
		line-height: 27px;
		letter-spacing: 0em;
		text-align: left;
		color: var(--white-g);
		margin: 0;
		margin-bottom: 24px;
	}
	p {
		font-size: 16px;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: 0em;
		text-align: left;
		color: var(--white-g);
		margin: 0;
		margin-bottom: 12px;
	}
	label {
		font-size: 16px;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: 0em;
		text-align: left;
		color: var(--white-g);
	}
	input {
		@include text-input;
	}
	a {
		@include simple-button($filled: true, $shadow: true);
	}
</style>

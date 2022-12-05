<script lang="ts">
	import { content } from 'src/stores/anonymousStore';
	import type { PageData } from './$types';

	export let data: PageData;
	$: atividade = data.atividade;
</script>

<h1>atividade {atividade.nome}</h1>
<p>olá, {$content ?? ''}</p>
jogo: {atividade.jogo}

<label for="text">
	<input bind:value={$content} placeholder="Qual seu nome?" />
</label>

<a href={`/atividade/${atividade.pin}/play`}>continuar</a>

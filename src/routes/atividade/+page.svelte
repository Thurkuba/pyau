<script>
	import { activityStore } from 'src/stores/activitiesStore';
	import { content } from 'src/stores/anonymousStore';
</script>

<h1>atividade {$activityStore.atividade.nome}</h1>
jogo: {$activityStore.atividade.jogo}

<p>{$content}</p>
<label for="text">
	nome de usuário:
	<input bind:value={$content} placeholder="username" />
</label>

<a href="/atividade/play">continuar</a>

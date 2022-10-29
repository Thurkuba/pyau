<script>
	import { page } from '$app/stores';
	const slug = page;
	export let data;
	console.log('slug =', slug);
</script>

<h2>{data.nomeguarani}</h2>
<h2>{data.nomept}</h2>
<h2>{data.descricao}</h2>
<br />
<a href="/educaindigena/memorias">voltar</a>

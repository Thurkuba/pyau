<script>
	import Header from '../components/header.svelte';
</script>

<div class="envolt">
	<Header />
	<h1>teste</h1>
	<slot><!-- optional fallback --></slot>
</div>

<style lang="scss">
	.envolt {
		background-color: lavender;
		min-width: 280px;
		max-width: 800px;
	}
</style>

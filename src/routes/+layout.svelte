<script>
	import Header from '../components/header.svelte';
	import Footer from '../components/footer.svelte';
</script>

<Header />
<main>
	<slot><!-- optional fallback --></slot>
</main>
<Footer />

<style lang="scss">
	main {
		/* width: 100%; */
		height: 1000px;
		overflow: hidden;
		padding: 12px 16px;
	}
</style>

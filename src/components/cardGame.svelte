<script>
	import cardMemorias from '$lib/assets/cardMemorias.png';
</script>

<a href="/educaindigena/memorias">
	<img src={cardMemorias} alt="jogo das memórias" />
</a>

<style lang="scss">
	img {
		width: 120px;
		height: 120px;
		transition: ease-in-out 0.2s;

		&:hover {
			transform: scale(1.05);
		}
	}
</style>

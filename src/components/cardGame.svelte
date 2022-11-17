<script lang="ts">
	import cardMemorias from '$lib/assets/cardMemorias.png';
	export let path: string;
</script>

<a href={path}>
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

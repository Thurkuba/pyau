<script lang="ts">
	import { fly } from 'svelte/transition';
	import addIcon from '$lib/assets/addIcon.png';
</script>

<a href="/educaindigena/memorias/add">
	<div class="container" in:fly={{ y: 100, duration: 1500 }}>
		<img src={addIcon} alt="adicionar" />
	</div>
</a>

<style lang="scss">
	.container {
		border: 1px solid black;
		width: 60px;
		height: 70px;
		box-sizing: border-box;
		padding: 12px;
		border-radius: 8px;
		background-color: var(--green-background);

		img {
			width: 100%;
			height: 100%;
		}
	}
</style>

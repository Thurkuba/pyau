<script>
	import closeIcon from '$lib/assets/closeIcon.png';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	const handleClose = () => {
		dispatch('close');
	};
</script>

<div class="close-container" on:click={handleClose}>
	<div class="close">
		<img src={closeIcon} alt="ícone de fechar" />
	</div>
</div>

<style lang="scss">
	.close-container {
		display: flex;
		align-items: center;
		height: 60px;
		margin-left: 12px;

		.close {
			cursor: pointer;

			img {
				width: 20px;
				height: 20px;
			}
		}
	}
</style>

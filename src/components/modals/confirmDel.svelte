<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import { clickOutside } from 'src/lib/actions/clickOutside';

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('close');
	};

	const handleSubmit = () => {
		dispatch('submit');
	};
</script>

<div class="overlay" transition:fade={{ duration: 500 }}>
	<div use:clickOutside on:outclick={handleClose} class="container">
		<h1>Excluir Carta</h1>
		<p>você tem certeza que deseja fazer isso?</p>
		<div class="btns">
			<button class="nao" on:click={handleClose}>não</button>
			<button class="sim" on:click={handleSubmit}>sim</button>
		</div>
	</div>
</div>

<style lang="scss">
	.overlay {
		z-index: zidx(overlay);
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #00000099;

		.container {
			background: var(--danger);
			border: 1px solid var(--white-g);
			border-radius: 8px;
			width: 75vw;
			height: auto;
			padding: 24px 16px;
			z-index: zidx(modal);
			display: flex;
			flex-direction: column;
			color: var(--white-g);
			p,
			h1 {
				font-weight: 400;
				letter-spacing: 0em;
				text-align: center;
				margin: 0;
				margin-bottom: 16px;
			}
			h1 {
				font-size: 24px;
				line-height: 32px;
			}
			p {
				font-size: 16px;
				line-height: 22px;
			}
			.btns {
				display: flex;
				justify-content: space-around;
				button {
					@include simple-button($shadow: true);
					width: 40%;
				}
				.sim {
					background: var(--danger);
					border: none;
				}
			}
		}
	}
</style>

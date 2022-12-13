<script lang="ts">
	import Sol from '../icons/sol.svelte';
	import type { CartaMem } from './memoryGame.svelte';

	export let card: CartaMem;
	export let handleChoice: (c: CartaMem) => void;
	export let flipped: boolean;
	export let disabled: boolean;

	const handleClick = () => {
		if (!disabled) {
			handleChoice(card);
		}
	};
</script>

<div class="card">
	<div class:flipped>
		<img src={card.src} class="front" alt={card.src} />
		<div class="back" on:keyup={handleClick} on:click={handleClick} alt="Segredo">
			<Sol size="60%" color="var(--secondary)" />
		</div>
		<!-- <img src={imgCover} class="back" on:keyup={handleClick} on:click={handleClick} alt="Segredo" /> -->
	</div>
</div>

<style lang="scss">
	.card {
		position: relative;
		height: clamp(80px, 17vh, 120px);
		img {
			width: 100%;
			display: block;
			border: 2px solid #fff;
			border-radius: 6px;
		}
		.front,
		.back {
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
			display: flex;
			justify-content: center;
			align-items: center;
			box-sizing: border-box;
			border: 4px solid #9ac992;
			box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
			border-radius: 8px;
		}
		.front {
			transform: rotateY(90deg);
			transition: all ease-in 0.2s;
			position: absolute;
		}
		.back {
			transition: all ease-in 0.2s;
			transition-delay: 0.2s;
			background-color: var(--primary);
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.flipped {
		.front {
			transform: rotateY(0deg);
			transition-delay: 0.2s;
		}

		.back {
			transform: rotateY(90deg);
			transition-delay: 0s;
		}
	}
</style>

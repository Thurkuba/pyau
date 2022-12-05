<script lang="ts">
	export let open: boolean;
	const toggleOpen = () => {
		open = !open;
	};
</script>

<button on:click|stopPropagation={toggleOpen}>
	<svg
		stroke="var(--secondary)"
		stroke-width="1"
		fill="none"
		width="36"
		height="36"
		viewBox="0 0 100 100"
	>
		<rect class:top={open} x="20" y="31" width="60" height="4" fill="var(--secondary)" />
		<rect class:mid={open} x="20" y="47.5" width="60" height="4" fill="var(--secondary)" />
		<rect class:bot={open} x="20" y="64" width="60" height="4" fill="var(--secondary)" />
	</svg>
</button>

<style lang="scss">
	button {
		background-color: transparent;
		cursor: pointer;
		padding: 8px;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 54px;
		height: 54px;
		border: none;
		border-radius: 28px;
		z-index: 99;
		svg {
			cursor: pointer;

			rect {
				transition: all 0.3s ease-in-out;
			}

			.mid {
				opacity: 0;
			}
			.top {
				transform-origin: center top;
				transform: rotate(45deg) translate(33%);
			}
			.bot {
				transform-origin: center top;
				transform: rotate(-45deg) translate(-33%, -33%);
			}
		}
		justify-content: center;
	}
</style>

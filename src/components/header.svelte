<script>
	import { auth } from 'src/lib/services/firebase';
	import { page } from '$app/stores';

	let open = false;
	const signOut = () => {
		auth.signOut();
		open = !open;
	};

	const clickOutside = () => open && (open = false);
</script>

<header>
	<nav>
		<a href="/">
			<h2>Pyau</h2>
			<img src="pyauIcon.png" alt="ícone de sol" />
		</a>

		{#if $page.url.pathname !== '/auth'}
			<div class="menuBurger">
				<button
					on:click|stopPropagation={() => {
						open = !open;
					}}
				>
					<img src="menuIcon.png" alt="" />
				</button>

				<!-- <MenuBurger /> -->
			</div>
		{/if}
		{#if open}
			<div
				class="openMenu"
				on:blur={() => {
					open = false;
				}}
			>
				<p on:click={signOut}>sair</p>
			</div>
		{/if}
	</nav>
</header>

<svelte:window on:click={clickOutside} />

<style lang="scss">
	header {
		width: 100%;
	}
	nav {
		box-sizing: border-box;
		width: 100%;
		padding: 12px;
		background-color: var(--green-primary);
		display: flex;
		justify-content: center;
		align-items: center;
		position: relative;
		/* flex-direction: ; */
		a {
			display: inline-flex;
			align-items: center;
			gap: 10px;
			h2 {
				margin: 0;
				color: white;
				font-size: 24px;
			}
			img {
				width: 21px;
				height: 23px;
			}
		}
	}
	.menuBurger {
		position: absolute;
		right: 16px;
	}
	img {
		width: 21px;
		height: 14px;
	}

	button {
		background-color: transparent;
		border: 0;
		position: relative;
	}
	.openMenu {
		position: absolute;
		top: 40px;
		right: 16px;
		background-color: var(--green-background);
		border-radius: 8px;
		overflow: hidden;
		min-width: 64px;

		p {
			margin: 0;
			padding: 8px 12px;
			cursor: pointer;
			text-align: center;
			&:hover {
				background-color: var(--green-secondary);
			}
		}
	}
</style>

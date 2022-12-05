<script>
	import authStore from 'src/stores/authStore';
	import { goto } from '$app/navigation';
	import { fly } from 'svelte/transition';
	import logo from '$lib/assets/pyauIcon.png';
	import menuIcon from '$lib/assets/menuIcon.png';

	import { signOut } from 'src/stores/profileStore';
	let open = false;

	const handleSignOut = () => {
		signOut();

		open = !open;
	};

	const clickOutside = () => open && (open = false);
</script>

<header>
	<nav>
		<a class="title" href="/">
			<h2>Pyau</h2>
			<img src={logo} alt="ícone de sol" />
		</a>

		{#if $authStore.loaded && $authStore.isLoggedIn}
			<div class="menuBurger">
				<button
					on:click|stopPropagation={() => {
						open = !open;
					}}
				>
					<img src={menuIcon} alt="" />
				</button>

				<!-- <MenuBurger /> -->
			</div>
		{/if}
		{#if open}
			<div
				class="openMenu"
				transition:fly={{ y: 32, duration: 800 }}
				on:blur={() => {
					open = false;
				}}
			>
				<p on:keyup={() => goto('/perfil')} on:click={() => goto('/perfil')}>perfil</p>

				<p on:keyup={handleSignOut} on:click={handleSignOut}>sair</p>
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
		.title {
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
		width: 120px;
		top: 40px;
		right: 16px;
		background-color: var(--green-background);
		border-radius: 8px;
		overflow: hidden;
		min-width: 64px;

		p {
			font-size: 20px;
			margin: 0;
			padding: 8px 12px;
			cursor: pointer;
			text-align: center;
			color: black;
			&:hover {
				background-color: var(--green-secondary);
			}
		}
	}
</style>

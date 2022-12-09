<script lang="ts">
	import authStore from 'src/stores/authStore';

	import Sol from 'src/components/icons/sol.svelte';
	import Back from 'src/components/icons/back.svelte';
	import MenuBurguer from 'src/components/nav/menuBurguer.svelte';
	import MenuMobile from 'src/components/nav/menuMobile.svelte';

	export let large = false;
	export let back = '';

	let open = false;

	$: {
		if (large) document.documentElement.style.setProperty('--header-h', '220px');
		else document.documentElement.style.setProperty('--header-h', '80px');
	}

	const clickOutside = () => open && (open = false);
</script>

<header>
	<nav>
		{#if back}
			<a class="back" href={back}>
				<Back color="var(--secondary)" />
			</a>
		{/if}
		<a class="logo" href="/">
			<Sol />
		</a>

		{#if $authStore.loaded && $authStore.isLoggedIn}
			<div class="menu">
				<MenuBurguer bind:open />
			</div>
		{/if}
	</nav>
	<MenuMobile bind:open />
</header>

<svelte:window on:click={clickOutside} />

<style lang="scss">
	header {
		width: 100%;
		position: relative;
		height: var(--header-h);
		nav {
			width: 100%;
			height: 100%;
			padding: 12px 24px;
			box-sizing: border-box;
			background-color: var(--primary);
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-template-areas: 'back logo menu';
			align-items: center;
			position: relative;
			.back {
				grid-area: back;
			}
			.logo {
				display: inline-flex;
				align-items: center;
				justify-content: center;
				grid-area: logo;
				box-sizing: border-box;
				height: 70%;
				overflow: hidden;
				:global(svg) {
					width: 100%;
					height: 100%;
				}
			}
			.menu {
				grid-area: menu;
				display: flex;
				align-items: center;
				justify-content: flex-end;
			}
		}
	}
</style>

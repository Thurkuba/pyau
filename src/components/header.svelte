<script lang="ts">
	import authStore from 'src/stores/authStore';

	import Sol from 'src/components/icons/sol.svelte';
	import Back from 'src/components/icons/back.svelte';
	import MenuBurguer from 'src/components/nav/menuBurguer.svelte';
	import MenuMobile from './nav/menuMobile.svelte';

	export let large = false;
	export let back = '';

	let open = false;

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
			<Sol size={large ? '125px' : '35px'} />
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
		nav {
			box-sizing: border-box;
			width: 100%;
			padding: 16px;
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

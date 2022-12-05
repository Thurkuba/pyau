<script lang="ts" context="module">
	export type FooterActions = {
		confirm?: { texto: string; onclick: () => void };
		back?: { to: string; onclick?: () => void };
	};
</script>

<script lang="ts">
	import Home from 'src/components/icons/home.svelte';
	import Back from './icons/back.svelte';

	export let actions: FooterActions = {};
	let back: FooterActions['back'];
	let confirm: FooterActions['confirm'];
	$: {
		back = actions?.back;
		confirm = actions?.confirm;
	}

	$: withActions = back || confirm;
</script>

<footer>
	{#if withActions}
		<a class="back" href={back?.to || '#'} on:click={back?.onclick}>
			<Back />
		</a>
		<a class="confirm" href={'#'} on:click={confirm?.onclick}>
			{confirm?.texto ?? 'continuar'}
		</a>
	{:else}
		<a class="home" href="/">
			<Home />
		</a>
	{/if}
</footer>

<style lang="scss">
	footer {
		position: fixed;
		padding: 16px;
		box-sizing: border-box;
		background-color: var(--primary);
		bottom: 0;
		width: 100%;
		height: 80px;
		display: flex;
		justify-content: center;
		align-items: center;
		a {
      @include simple-button;
			&.home,
			&.back {
				width: 48px;
			}
			&.confirm {
				margin-left: 10px;
				flex: 1;
			}
		}
	}
</style>

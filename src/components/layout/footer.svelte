<script lang="ts" context="module">
	export type FooterActions = {
		confirm?: { texto: string; onclick: (() => void) | string };
		back?: { onclick?: (() => void) | string };
	};
</script>

<script lang="ts">
	import Home from 'src/components/icons/home.svelte';
	import Back from 'src/components/icons/back.svelte';

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
		{#if back}
			<a
				class="back"
				href={typeof back?.onclick === 'string' ? back.onclick : '#'}
				on:click={typeof back?.onclick === 'function' ? back.onclick : undefined}
			>
				<Back />
			</a>
		{/if}
		<a
			class="confirm"
			href={typeof confirm?.onclick === 'string' ? confirm.onclick : '#'}
			on:click={typeof confirm?.onclick === 'function' ? confirm.onclick : undefined}
		>
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
		height: var(--footer-h);
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

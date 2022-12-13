<script lang="ts">
	import Home from 'src/components/icons/home.svelte';
	import Back from 'src/components/icons/back.svelte';
	import type { FooterControl } from 'src/stores/layoutStore';

	let fC: FooterControl = { tipo: 'none' };
	export { fC as footerControl };
</script>

<footer class:none={fC.tipo === 'none'}>
	{#if fC.tipo === 'inicio'}
		<a class="inicio" href="/">
			<Home color="var(--secondary)" />
		</a>
	{:else if fC.tipo === 'simples'}
		{#if fC.btn1?.back}
			<a
				class="back"
				href={typeof fC.btn1?.back === 'string' ? fC.btn1?.back : '#'}
				on:click={typeof fC.btn1?.back === 'function' ? fC.btn1?.back : undefined}
			>
				<Back />
			</a>
		{/if}
		{#if fC.btn1?.efeito}
			<a
				class:shadow={fC.btn1?.sombra}
				class="btn"
				href={typeof fC.btn1?.efeito === 'string' ? fC.btn1.efeito : '#'}
				on:click={typeof fC.btn1?.efeito === 'function' ? fC.btn1.efeito : undefined}
			>
				{fC.btn1?.texto ?? 'continuar'}
			</a>
		{/if}
	{:else if fC.tipo === 'duplo'}
		<div class="duplo">
			<a
				class:shadow={fC.btn1?.sombra}
				class="btn"
				href={typeof fC.btn1?.efeito === 'string' ? fC.btn1.efeito : '#'}
				on:click={typeof fC.btn1?.efeito === 'function' ? fC.btn1.efeito : undefined}
			>
				{fC.btn1?.texto ?? 'continuar'}
			</a>
			<a
				class:shadow={fC.btn2?.sombra}
				class="btn"
				href={typeof fC.btn2?.efeito === 'string' ? fC.btn2.efeito : '#'}
				on:click={typeof fC.btn2?.efeito === 'function' ? fC.btn2.efeito : undefined}
			>
				{fC.btn2?.texto ?? 'continuar'}
			</a>
		</div>
	{/if}
</footer>

<style lang="scss">
	footer {
		position: relative;
		padding: 16px 32px;
		box-sizing: border-box;
		background-color: var(--primary);
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		z-index: zidx(footer);
		a {
			@include simple-button;
			&.inicio,
			&.back {
				width: 48px;
			}
			&.inicio {
				border-radius: 50%;
			}
			&.btn {
				margin-left: 10px;
				flex-grow: 1;
			}
			&.shadow {
				background: var(--secondary);
				box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
			}
		}
		.duplo {
			display: flex;
			flex-wrap: wrap;
			align-items: center;
			justify-content: center;
			width: 100%;
			a {
				width: 100%;
				margin-bottom: 10px;
			}
		}
		&.none {
			display: none;
		}
	}
</style>

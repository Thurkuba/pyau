<script lang="ts">
	import Home from 'src/components/icons/home.svelte';
	import Back from 'src/components/icons/back.svelte';
	import type { FooterControl } from 'src/stores/layoutStore';

	let fC: FooterControl = { tipo: 'none' };
	export { fC as footerControl };
</script>

<footer>
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
				class="btn"
				href={typeof fC.btn1?.efeito === 'string' ? fC.btn1.efeito : '#'}
				on:click={typeof fC.btn1?.efeito === 'function' ? fC.btn1.efeito : undefined}
			>
				{fC.btn1?.texto ?? 'continuar'}
			</a>
			<a
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
		padding: 24px;
		box-sizing: border-box;
		background-color: var(--primary);
		bottom: 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
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
	}
</style>

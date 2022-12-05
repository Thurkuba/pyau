<script lang="ts">
	import voltaIcon from '$lib/assets/voltaIcon.png';
	// type BreadcrumbItems = {
	// 	text: string;
	// 	path: string;
	// 	sub: string | null;
	// };
	export let text: string = '';
	export let path: string = '/';
	export let sub: string = '';

	// const items = { text: 'Jogo das Memórias', href: '/educaindigena', sub: '' };
</script>

<a href={path}>
	<div class="container">
		<img src={voltaIcon} alt="voltar" class="icon" />
		<p>{text}</p>
		{#if sub}
			{sub}
		{/if}
		<span />
	</div>
</a>

<style>
	.container {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 12px 0;
	}
	p {
		font-size: 20px;
		color: black;
		margin: 0;
	}
	.icon,
	span {
		width: 14px;
		height: 21px;
	}
</style>

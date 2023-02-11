<script>
	export let color = '#ffffff';
	export let filled = false;
	export let fill = filled ? color : 'none';
	export let size = '1em';
</script>

<svg
	on:click
	on:keyup
	width={size}
	height={size}
	viewBox="0 0 32 32"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect {fill} x="14" width="4" height="32" />
	<rect {fill} x="32" y="14" width="4" height="32" transform="rotate(90 32 14)" />
</svg>

<style>
	svg {
		position: relative;
		display: inline-block;
	}
</style>

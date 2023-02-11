<script>
	export let color = '#ffffff';
	export let filled = true;
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
	<rect {fill} x="12" y="12" width="2" height="12" />
	<rect x="18" y="12" width="2" height="12" {fill} />
	<path {fill} d="M4,6V8H6V28a2,2,0,0,0,2,2H24a2,2,0,0,0,2-2V8h2V6ZM8,28V8H24V28Z" />
	<rect x="12" y="2" width="8" height="2" {fill} />
</svg>

<style>
	svg {
		position: relative;
		display: inline-block;
	}
</style>

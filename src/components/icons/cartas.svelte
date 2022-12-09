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
	viewBox="0 0 29 43"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<rect x="0.5" y="0.5" width="22.2" height="32.7857" rx="3.5" {fill} stroke={color} />
	<rect x="6.2998" y="9.71436" width="22.2" height="32.7857" rx="3.5" {fill} stroke={color} />
</svg>

<style>
	svg {
		position: relative;
		display: inline-block;
		box-sizing: border-box;
	}
</style>

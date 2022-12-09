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
	viewBox="0 0 20 20"
	{fill}
	xmlns="http://www.w3.org/2000/svg"
>
	<path d="M18 2L2 18M2 2L18 18" stroke-width={2} stroke={color} />
</svg>

<style>
	svg {
		position: relative;
		display: inline-block;
		box-sizing: border-box;
	}
</style>

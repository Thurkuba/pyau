<script>
	export let fill = '#ffffff';
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
	<circle cx="10" cy="2.5" r="2" />
	<circle cx="10" cy="10.5" r="2" />
	<circle cx="10" cy="18.5" r="2" />
</svg>

<style>
	svg {
		position: relative;
		display: inline-block;
		box-sizing: border-box;
	}
</style>

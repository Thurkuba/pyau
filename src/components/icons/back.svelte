<script>
	export let color = '#ffffff';
	export let filled = false;
	export let fill = filled ? color : 'none';
	export let size = '1em';
</script>

<svg width={size} height={size} viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
	<path
		{fill}
		stroke={color}
		d="M15 2.5L5 9.99352M15 17.5L5 10.0065"
		stroke-width="2"
		stroke-linecap="round"
	/>
</svg>

<style>
	svg {
		position: relative;
		display: inline-block;
	}
</style>

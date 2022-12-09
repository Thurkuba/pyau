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
	viewBox="0 0 16 16"
	fill="none"
	xmlns="http://www.w3.org/2000/svg"
>
	<path
		{fill}
		stroke={color}
		d="M3.43623 15.5V7.81116H4.0115V15.5H3.43623ZM2.7287 6.81116H2.43623V7.10447L1.11388 8.43062L0.706095 8.02166L6.88596 1.82405L7.29374 2.233L2.7287 6.81116ZM7.5932 1.11708L7.79831 0.911382L8.20495 1.31918L7.99984 1.52488L7.5932 1.11708ZM8.70593 2.233L9.11372 1.82405L15.2939 8.02199L14.8861 8.43095L13.5634 7.10447V6.81116H13.271L8.70593 2.233ZM12.5634 7.81116V15.5H11.9882V7.81116H12.5634Z"
		stroke-width="1"
		stroke-linecap="round"
	/>
</svg>

<style>
	svg {
		position: relative;
		display: inline-block;
	}
</style>

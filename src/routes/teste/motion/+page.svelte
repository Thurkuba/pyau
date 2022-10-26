<script>
	import { fly } from 'svelte/transition';

	let number = 0;
</script>

<div>
	The number is:
	{#key number}
		<span style="display: inline-block" in:fly={{ y: -20 }}>
			{number}
		</span>
	{/key}
</div>
<br />
<button
	on:click={() => {
		number += 1;
	}}
>
	Increment
</button>

<svg width="400" height="180">
	<rect
		x="50"
		y="20"
		width={number}
		height={number}
		style="fill:blue;stroke:pink;stroke-width:5;fill-opacity:0.1;stroke-opacity:0.9"
	/>
</svg>

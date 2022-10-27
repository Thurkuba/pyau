<script lang="ts">
	import { fly } from 'svelte/transition';
	export let title: string;
</script>

<div class="box" in:fly={{ y: 50, duration: 1000 }}>
	<p>{title}</p>
	<slot />
</div>

<style>
	.box {
		border-radius: 8px;
		padding: 12px;
		background-color: var(--green-background);
	}
	p {
		margin: 0px 0 12px 0;
	}
</style>

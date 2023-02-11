<script lang="ts">
	import { fly } from 'svelte/transition';
	import Add from './icons/add.svelte';
</script>

<a href="/educaindigena/memorias/add" in:fly={{ y: 100, duration: 1500 }}>
	<Add size="32px" fill="var(--primary)" />
</a>

<style lang="scss">
	a {
		width: 60px;
		height: 80px;
		border-radius: 8px;
		background-color: var(--secondary);
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
	}
</style>

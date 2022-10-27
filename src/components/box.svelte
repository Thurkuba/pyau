<script lang="ts">
	export let title: string;
</script>

<div class="box">
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

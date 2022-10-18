<script lang="ts">
	export let path: string;
	export let pathName: string;
</script>

<button>
	<a href={path}>
		{pathName}
	</a>
</button>

<style>
	a {
		color: black;
	}
	button {
		padding: 8px 16px;
		border-color: transparent;
		border-radius: 8px;
	}
</style>

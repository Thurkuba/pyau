<script lang="ts">
	export let name: string;
	let a = 1;
	let b = 2;
</script>

<input bind:value={name} type="text" />

<h1>eae, {name} !</h1>

<label>
	<p>a = {a}</p>
	<input type="number" bind:value={a} min="0" max="10" />

	<input type="range" bind:value={a} min="0" max="10" />
</label>
<br />
<label>
	<p>b = {b}</p>
	<input type="number" bind:value={b} min="0" max="10" />
	<input type="range" bind:value={b} min="0" max="10" />
</label>

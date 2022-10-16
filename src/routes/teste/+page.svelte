<script>
	import Nested from './nested.svelte';
	import Inner from './inner.svelte';
	import Input from './input.svelte';

	let name = 'thunder';
	let count = 0;
	$: doubled = count * 2;

	function incrementCount() {
		count += 1;
	}

	$: if (count >= 10) {
		alert('count is dangerously high!');
		count = 9;
	}

	function handleMessage(event) {
		alert(event.detail.text);
	}
</script>

<button on:click={incrementCount}>
	Clicked {count}
	{count === 1 ? 'time' : 'times'}
</button>
<p>doubled = {doubled}</p>
<Nested answer={doubled} />
<Inner on:message={handleMessage} />

<hr />
<h1>Input</h1>
<Input {name} />

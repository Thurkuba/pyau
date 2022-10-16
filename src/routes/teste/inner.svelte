<script>
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();
	function sayHello() {
		dispatch('message', {
			text: 'Kaaruju !'
		});
	}
</script>

<button on:click={sayHello}> Teste dispatch </button>

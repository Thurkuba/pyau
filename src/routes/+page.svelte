<script lang="ts">
	import { profileStore } from 'src/stores/profileStore';
	import authStore from 'src/stores/authStore';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Box from 'src/components/box.svelte';

	let pin: string;

	$: if (browser && $authStore.loaded && $authStore.isLoggedIn) {
		switch ($profileStore.papel) {
			case 'prof':
				goto('/prof');
				break;
			case 'educaindigena':
				goto('/educaindigena');
				break;
		}
	}

	const handlePinSubmit = async (e: Event) => {
		e.preventDefault();
		goto(`/atividade/${pin}`);
	};
</script>

<Box alignCenter>
	<h3>Insira o código da atividade</h3>
	<form>
		<label for="text">
			<input type="text" bind:value={pin} placeholder="código PIN" />
		</label>
	</form>
	<button on:click={handlePinSubmit}>buscar atividade</button>
</Box>

<a href="/auth">login educador(a)</a>

<style>
	input {
		background-color: white;
		border: 1px solid transparent;
		box-shadow: 0 0 2px 2px #00000020;
		border-radius: 4px;
		text-align: center;
	}
</style>

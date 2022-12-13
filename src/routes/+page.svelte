<script lang="ts">
	import { profileStore } from 'src/stores/profileStore';
	import authStore from 'src/stores/authStore';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import Box from 'src/components/box.svelte';
	import { layoutControl } from 'src/stores/layoutStore';

	let pin: string;

	layoutControl.setHeader({ large: true, back: '' });
	layoutControl.setFooter({
		tipo: 'duplo',
		btn1: { texto: 'explorar', efeito: '/explorar' },
		btn2: { texto: 'login', efeito: '/auth' }
	});

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
	<form>
		<label for="text">
			<input type="text" bind:value={pin} placeholder="código PIN" />
		</label>
	</form>
	<button on:click={handlePinSubmit}>buscar atividade</button>
</Box>

<style lang="scss">
	form {
		width: 100%;
		label {
			input {
				@include text-input;
				width: 100%;
			}
		}
	}
	button {
		@include simple-button;
		width: 100%;
	}
</style>

<script lang="ts">
	import { auth } from 'src/lib/services/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	import Box from 'src/components/box.svelte';

	let email: string;
	let senha: string;

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		await signInWithEmailAndPassword(auth, email, senha);
	};
</script>

<Box>
	<form on:submit={handleSubmit}>
		<input type="text" placeholder="e-mail" bind:value={email} />
		<input type="password" placeholder="senha" bind:value={senha} />
		<button type="submit">login</button>
	</form>
</Box>

<style lang="scss">
	form {
		display: flex;
		flex-direction: column;
	}
	input {
		@include text-input;
	}
	button {
		@include simple-button;
		margin-top: 24px;
	}
</style>

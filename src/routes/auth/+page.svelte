<script lang="ts">
	import { auth } from 'src/lib/services/firebase';
	import { signInWithEmailAndPassword } from 'firebase/auth';
	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		await signInWithEmailAndPassword(auth, email, senha);
	};
	let email: string;
	let senha: string;
</script>

<form on:submit={handleSubmit}>
	<label for="">
		email
		<br />
		<input type="text" bind:value={email} />
	</label>
	<br />
	<label for="">
		senha
		<br />
		<input type="password" bind:value={senha} />
	</label>
	<br />
	<button type="submit">login</button>
</form>

<style>
	form {
		display: flex;
		flex-direction: column;
	}
	label {
		margin: 0;
		padding: 4px 4px;
	}
	input {
		margin: 8px 0;
		height: 32px;
		border-color: var(--c1);
		border-radius: 4px;
		border-width: 1px;
		width: 100%;
		max-width: 400px;
	}
	button {
		margin: 24px 4px;
		padding: 4px;
		width: 100%;
		height: 40px;
	}
</style>

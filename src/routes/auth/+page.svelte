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
		<input type="text" bind:value={email} />
	</label>
	<br />
	<label for="">
		senha
		<input type="password" bind:value={senha} />
	</label>
	<br />
	<button type="submit">login</button>
</form>

<script lang="ts">
	import Button from '../components/button.svelte';
	// import Auth from '../components/Auth.svelte';
	import authStore from 'src/stores/authStore';
	import { auth } from 'src/lib/services/firebase';
	import profileStore from 'src/stores/firestoreStore';
</script>

<h1>boraí !</h1>
<Button path="/teste" pathName="teste!" />
<!-- <Auth /> -->
<p>nome: {$profileStore.nome}</p>

<p>papel: {$profileStore.papel}</p>
<br />

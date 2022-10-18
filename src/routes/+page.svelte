<script lang="ts">
	import Button from '../components/button.svelte';
	// import Auth from '../components/Auth.svelte';
	import authStore from 'src/stores/authStore';
	import { auth } from 'src/lib/services/firebase';
	const signOut = () => {
		auth.signOut();
	};
</script>

<h1>boraí !</h1>
<Button path="/teste" pathName="teste!" />
<!-- <Auth /> -->
{#if $authStore.isLoggedIn}
	{$authStore.user?.email}
{/if}
<br />
<button on:click={signOut}> sign Out </button>

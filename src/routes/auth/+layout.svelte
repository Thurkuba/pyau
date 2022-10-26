<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import { page } from '$app/stores';
	import authStore from 'src/stores/authStore';

	$: pathname = $page.url.pathname;
	let title = '';
	$: {
		if (pathname === '/auth') title = 'login';
	}
	$: if (browser && $authStore.loaded && $authStore.isLoggedIn) goto('/');
</script>

{#if $authStore.loaded && !$authStore.isLoggedIn}
	<main>
		<div class="content">
			<!-- <h1>{title}</h1> -->
			<slot />
		</div>
	</main>
{:else}
	Loading...
{/if}

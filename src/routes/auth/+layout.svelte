<script lang="ts">
	import { goto } from '$app/navigation';
	import { browser } from '$app/environment';
	import authStore from 'src/stores/authStore';
	import { layoutControl } from 'src/stores/layoutStore';
	import { profileStore } from 'src/stores/profileStore';

	layoutControl.setFooter({ tipo: 'simples', btn1: { back: '/' } });
	layoutControl.setHeader({ large: true, back: '' });
	$: {
		if (browser && $authStore.loaded && $authStore.isLoggedIn && $profileStore.loaded) {
			console.log($profileStore);
			switch ($profileStore.papel) {
				case 'prof':
					console.log('aaaaaa');
					goto('/prof');
					break;
				case 'educaindigena':
					console.log('bbbbbb');
					goto('/educaindigena');
					break;
				default:
					console.log('cccccc');
					goto('/');
					break;
			}
		}
	}
</script>

{#if $authStore.loaded && !$authStore.isLoggedIn}
	<main>
		<div class="content">
			<slot />
		</div>
	</main>
{:else}
	Loading...
{/if}

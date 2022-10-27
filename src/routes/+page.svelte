<script lang="ts">
	import profileStore from 'src/stores/profileStore';
	import { goto } from '$app/navigation';

	$: {
		switch ($profileStore.papel) {
			case 'prof':
				goto('/prof');
				break;
			case 'aluno':
				goto('/aluno');
				break;
			case 'educaindigena':
				goto('/educaindigena');
				break;
		}
	}
</script>

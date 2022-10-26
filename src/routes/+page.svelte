<script lang="ts">
	import profileStore from 'src/stores/firestoreStore';
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

<!-- <h1>boraí !</h1> -->
<!-- <Button path="/" pathName="teste!" /> -->
<!-- <p>nome: {$profileStore.nome}</p> -->

<!-- <p>papel: {$profileStore.papel}</p> -->
<!-- <br /> -->

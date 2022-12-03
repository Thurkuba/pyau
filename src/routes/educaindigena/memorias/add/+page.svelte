<script lang="ts">
	import {
		getDownloadURL,
		ref,
		uploadBytes,
		uploadBytesResumable,
		type UploadTask
	} from 'firebase/storage';
	import closeIcon from '$lib/assets/closeIcon.png';
	import { createCard } from 'src/stores/memoStore';
	import type { Carta } from 'src/stores/memoStore';
	import CardMemo from 'src/components/cardMemo.svelte';
	import Button from 'src/components/button.svelte';
	import { storage } from 'src/lib/services/firebase';
	import { getFileExtension } from 'src/lib/helpers/file';

	let cartaData: Carta = {
		nomeguarani: '',
		nomept: '',
		descricao: '',
		imagem: '',
		id: ''
	};

	let open = false;
	const handleOpen = async (e: Event) => {
		e.preventDefault();
		open = true;
	};

	let files: FileList;
	$: {
		const file = files?.[0];
		if (file) uploadImage(file);
	}

	let task: UploadTask;
	let progress = 0;
	let status: 'running' | 'paused' | 'success' | 'canceled' | 'error' | '' = '';
	$: {
		task?.on(
			'state_changed',
			(snapshot) => {
				progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
				status = snapshot.state;
			},
			(error) => {
				switch (error.code) {
					case 'storage/canceled':
						console.log('Download cancelado');
						break;
					default:
						console.log('Deu ruim:', error.code);
						break;
				}
			},
			() => {
				status = 'success';
				getDownloadURL(task.snapshot.ref).then((url) => {
					cartaData.imagem = url;
				});
			}
		);
	}

	const uploadImage = async (file: File) => {
		if (!file) {
			alert('Arquivo não encontrado!');
			return;
		}
		const ext = getFileExtension(file.name);
		const fileName = `${Date.now()}.${ext}`;
		const fileRef = ref(storage, `memoria/${fileName}`);
		task = uploadBytesResumable(fileRef, file);
	};

	const handleSubmit = async (e: Event) => {
		// e.preventDefault();
		console.log('criando carta', cartaData);
		await createCard(cartaData);
	};

	const handleClose = () => {
		open = false;
	};
</script>

{#if open}
	<CardMemo {...cartaData} submit={true} on:close={handleClose} on:submit={handleSubmit} />
{/if}

<div class="container">
	<div class="close">
		<a href="/educaindigena/memorias">
			<img src={closeIcon} alt="ícone de fechar" />
		</a>
	</div>

	<form on:submit={handleOpen}>
		<label for="text">
			nome da carta (guarani)
			<input type="text" bind:value={cartaData.nomeguarani} />
		</label>
		<label for="text">
			nome da carta (português)
			<input type="text" bind:value={cartaData.nomept} />
		</label>
		<label for="text">
			descrição
			<input type="text" bind:value={cartaData.descricao} />
		</label>
		<label for="text">
			imagem
			<input type="file" accept="image/*" bind:files />
			{#if status === 'running'}
				<p>Fazendo upload... {progress.toFixed(0)}%</p>
			{:else if status === 'success'}
				<p>Upload completo!</p>
			{:else if status === 'error'}
				<p>Erro com o upload... =/</p>
			{/if}
		</label>

		<div class="btn-container">
			<Button text="criar carta" on:click={handleOpen} />
		</div>
	</form>
</div>

<style lang="scss">
	.close {
		display: flex;
		align-items: center;
		height: 60px;

		img {
			width: 20px;
			height: 20px;
		}
	}
</style>

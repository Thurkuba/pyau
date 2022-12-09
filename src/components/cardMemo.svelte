<script lang="ts">
	import { fade } from 'svelte/transition';
	import { createEventDispatcher } from 'svelte';
	import {
		editCard
		// deleteCard
	} from 'src/stores/memoStore';
	import { goto } from '$app/navigation';
	import Close from 'src/components/close.svelte';
	import Button from './button.svelte';
	import { getDownloadURL, ref, uploadBytesResumable, type UploadTask } from 'firebase/storage';
	import { getFileExtension } from 'src/lib/helpers/file';
	import { storage } from 'src/lib/services/firebase';

	export let nomeguarani: string;
	export let nomept: string;
	export let descricao: string;
	export let imagem: string;
	export let id: string;

	export let submit = false;
	export let edit = false;

	let editNomeguarani: string = nomeguarani;
	let editNomept = nomept;
	let editDescricao = descricao;
	let editImagem = imagem;

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
					editImagem = url;
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

	const dispatch = createEventDispatcher();

	const handleClose = () => {
		dispatch('close');
	};

	const handleSubmit = () => {
		dispatch('submit');
		handleClose();
		goto('/educaindigena/memorias');
	};

	const handleEdit = async (e: Event) => {
		e.preventDefault();
		await editCard(id, {
			nomeguarani: editNomeguarani,
			nomept: editNomept,
			descricao: editDescricao,
			imagem: editImagem,
			id: id
		});
		handleClose();
	};

	// const handleDelete = async (e: Event) => {
	// 	e.preventDefault();
	// 	await deleteCard(id);
	// 	handleClose();
	// };
</script>

<div class="popup" transition:fade={{ duration: 500 }}>
	<div class="container">
		<Close on:close />
		<div class="card">
			{#if !edit}
				<div class="image-container">
					<div class="image">
						<img src={imagem} alt="'imagem de {nomept}'" />
					</div>
				</div>
				<div class="text-container">
					<h2>
						{nomeguarani} ({nomept})
					</h2>
					<p>
						{descricao}
					</p>
				</div>
				{#if submit}
					<Button on:click={handleSubmit} text="criar carta" />
				{:else}
					<div class="btn-container">
						<!-- <Button on:click={handleDelete} text="deletar" secondary /> -->
						<Button
							on:click={() => {
								edit = true;
							}}
							text="editar carta"
						/>
					</div>
				{/if}
			{:else}
				<form on:submit={handleEdit}>
					<label for="text">
						nome da carta (guarani)
						<input type="text" bind:value={editNomeguarani} />
					</label>
					<label for="text">
						nome da carta (português)
						<input type="text" bind:value={editNomept} />
					</label>
					<label for="text">
						descrição
						<input type="text" bind:value={editDescricao} />
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
						<Button
							on:click={() => {
								edit = false;
							}}
							text="cancelar"
							secondary
						/>
						<Button type="submit" text="confirmar" />
					</div>
				</form>
			{/if}
		</div>
	</div>

	<div class="popupoutside" on:keyup={handleClose} on:click={handleClose} />
</div>

<style lang="scss">
	.container {
		border: 1px solid black;
		width: 80vw;
		height: 70vh;
		border-radius: 8px;
		background-color: white;
		z-index: zidx(modal);
	}
	.card {
		padding: 0 16px 16px 16px;

		.image-container {
			display: flex;
			justify-content: center;
			margin-bottom: 16px;

			width: 100%;
			.image {
				border: 1px solid black;
				border-radius: 8px;
				width: 160px;
				height: 188px;

				img {
					padding: 4px;
					box-sizing: border-box;
					width: 100%;
					height: 100%;
				}
			}
		}
	}
	h2 {
		margin-bottom: 12px;
	}
	.btn-container {
		width: 100%;
		margin: 20px 0 0 0;
		display: flex;
		justify-content: right;
		gap: 8px;
	}
	.popup {
		position: absolute;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		margin: auto;
		display: flex;
		justify-content: center;
		align-items: center;

		.popupoutside {
			width: 100%;
			height: 100%;
			position: absolute;
			background-color: black;
			opacity: 60%;
		}
	}
</style>

<script lang="ts">
	import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
	import { createCard } from 'src/stores/memoStore';
	import type { Carta } from 'src/types/memoria';
	import CardMemo from 'src/components/modals/cardMemo.svelte';
	import { storage } from 'src/lib/services/firebase';
	import { getFileExtension } from 'src/lib/helpers/file';
	import { layoutControl } from 'src/stores/layoutStore';
	import Breadcrumb from 'src/components/breadcrumb.svelte';
	import Box from 'src/components/box.svelte';
	import Add from 'src/components/icons/add.svelte';
	import { goto } from '$app/navigation';

	layoutControl.setFooter({ tipo: 'none' });

	let cartaData: Carta = {
		nomeguarani: '',
		nomept: '',
		descricao: '',
		imagem: '',
		id: ''
	};

	$: complete =
		cartaData.nomeguarani && cartaData.nomept && cartaData.descricao && cartaData.imagem;

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

	let progress = 0;
	let status: 'running' | 'paused' | 'success' | 'canceled' | 'error' | '' = '';

	const uploadImage = async (file: File) => {
		if (!file) {
			alert('Arquivo não encontrado!');
			return;
		}
		const ext = getFileExtension(file.name);
		const fileName = `${Date.now()}.${ext}`;
		const fileRef = ref(storage, `memoria/${fileName}`);
		const task = uploadBytesResumable(fileRef, file);

		task?.on(
			'state_changed',
			(snapshot) => {
				console.log(snapshot);
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
	};

	let sucesso = false;
	const handleSubmit = async () => {
		console.log('criando carta', cartaData);
		await createCard(cartaData);
		sucesso = true;
	};
	$: if (!open && sucesso) open = true;

	const handleClose = () => {
		open = false;
		if (sucesso) goto('/educaindigena/memorias');
	};

	const breadcrumbItems = { text: 'criar carta', path: '/educaindigena/memorias' };

	let fileInput: HTMLInputElement;
</script>

{#if open}
	<CardMemo {sucesso} criar {...cartaData} on:close={handleClose} on:submit={handleSubmit} />
{/if}

<Breadcrumb {...breadcrumbItems} />
<Box>
	<form on:submit={handleOpen}>
		<label for="text">
			nome da carta (guarani)
			<input placeholder="nome da carta (guarani)" type="text" bind:value={cartaData.nomeguarani} />
		</label>
		<label for="text">
			nome da carta (português)
			<input placeholder="nome da carta (português)" type="text" bind:value={cartaData.nomept} />
		</label>
		<label for="text">
			descrição
			<textarea rows="5" placeholder="descrição" type="text" bind:value={cartaData.descricao} />
		</label>
		<label for="text">
			imagem
			<input bind:this={fileInput} class="img" type="file" accept="image/*" bind:files />
			<button class="add-img" on:click|preventDefault={() => fileInput?.click()}>
				{#if status !== 'success'}
					<Add size="42px" fill="var(--primary)" />
				{:else}
					<img src={cartaData.imagem} alt="imagem da carta" />
				{/if}
			</button>
			{#if status === 'running'}
				<progress max="100" value={progress} />
			{/if}
		</label>

		<button disabled={!complete} class="open" on:click={handleOpen}>criar carta</button>
	</form>
</Box>

<style lang="scss">
	label {
		font-size: 16px;
		font-weight: 400;
		line-height: 22px;
		letter-spacing: 0em;
		text-align: left;
		color: var(--white-g);
	}
	input {
		@include text-input($align: left);
		&.img {
			display: none;
		}
	}
	textarea {
		@include text-input($align: left);
		height: unset;
	}
	.open {
		@include simple-button;
		width: 100%;
		margin-top: 24px;
	}

	.add-img {
		width: 120px;
		height: 160px;
		border-radius: 8px;
		background-color: var(--white-g);
		border: 4px solid var(--secondary);
		display: flex;
		justify-content: center;
		align-items: center;
		box-shadow: 2px 4px 4px rgba(0, 0, 0, 0.1);
		cursor: pointer;
		margin: auto;
		img {
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
	}
	progress {
		width: 100%;
		height: 8px;
		border-radius: 4px;
		margin-top: 12px;
		&::-moz-progress-bar {
			background: var(--primary);
		}
		&::-webkit-progress-value {
			background: var(--primary);
		}
	}
</style>

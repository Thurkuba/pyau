<script lang="ts" context="module">
	export type CartaMem = { src: string; matched: boolean; id?: number };
</script>

<script lang="ts">
	import { goto } from '$app/navigation';

	import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
	import { db } from 'src/lib/services/firebase';
	import { content } from 'src/stores/anonymousStore';
	import type { Carta } from 'src/types/memoria';
	import CardMemo from '../cardMemo.svelte';

	import SingleCard from './singleCard.svelte';

	export let cartas: Carta[] = [];
	export let pin = '';

	let cartasMem: CartaMem[] = [];
	$: {
		cartasMem = cartas?.map((c) => ({ src: c.imagem, matched: false })) ?? [];
		if (cartasMem.length) shuffledCards();
	}

	let cards: CartaMem[] = [];
	let turns = 0;
	let choiceOne: CartaMem | null = null;
	let choiceTwo: CartaMem | null = null;
	let disabled = false;
	let foundCard: Carta | undefined;

	const shuffledCards = () => {
		const shuffledCards = [...cartasMem, ...cartasMem]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));
		cards = shuffledCards;
		turns = 0;
	};

	const handleChoice = (carta: CartaMem) => {
		choiceOne ? (choiceTwo = carta) : (choiceOne = carta);
	};

	$: {
		if (choiceOne && choiceTwo) {
			disabled = true;
			const srcOne = choiceOne.src;
			const srcTwo = choiceTwo.src;
			if (srcOne === srcTwo) {
				cards = cards.map((card) => {
					if (card.src === srcOne) {
						const found = cartas.find((c) => c.imagem === srcOne);
						foundCard = found;
						return { ...card, matched: true };
					} else return card;
				});
				resetTurn();
			} else {
				setTimeout(() => resetTurn(), 1000);
			}
		}
	}

	const resetTurn = () => {
		choiceOne = null;
		choiceTwo = null;
		turns = turns + 1;
		disabled = false;
	};

	$: {
		if (cards.length && cards.every((c) => c.matched)) {
			setTimeout(async () => {
				if (pin) {
					const docRef = doc(db, 'atividades', pin);
					await updateDoc(docRef, { completo: arrayUnion($content) });
					alert('Yay o/');
				} else {
					goto('/explorar/memoria/play/vitoria');
				}
			}, 600);
		}
	}
</script>

<div class="jogo">
	<div class="card-grid">
		{#each cards as card (card.id)}
			<SingleCard
				{card}
				{disabled}
				{handleChoice}
				flipped={card === choiceOne || card === choiceTwo || card.matched}
			/>
		{/each}
	</div>
</div>
{#if foundCard}
	<CardMemo on:close={() => (foundCard = undefined)} {...foundCard} />
{/if}

<style lang="scss">
	.jogo {
		margin: 0 auto;
		background: var(--primary);
		height: 100%;
		overflow: hidden;
		.card-grid {
			height: 100%;
			overflow: hidden;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(4, 1fr);
			grid-gap: 20px;
			align-content: top;
		}
	}
</style>

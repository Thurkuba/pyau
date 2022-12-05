<script lang="ts" context="module">
	export type CartaMem = { src: string; matched: boolean; id?: number };
</script>

<script lang="ts">
	import { arrayUnion, doc, updateDoc } from 'firebase/firestore';
	import { db } from 'src/lib/services/firebase';
	import { content } from 'src/stores/anonymousStore';
	import type { Carta } from 'src/types/memoria';

	import SingleCard from './singleCard.svelte';

	let imgCover =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/cover.png';

	export let cartas: Carta[] = [];
	export let pin: string;

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
					if (card.src === srcOne) return { ...card, matched: true };
					else return card;
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
				const docRef = doc(db, 'atividades', pin);
				await updateDoc(docRef, { completo: arrayUnion($content) });
				alert('Yay o/');
			}, 600);
		}
	}
</script>

<div class="jogo">
	<h1>Magic Match</h1>
	<button on:click={shuffledCards}> New Game </button>
	<div class="card-grid">
		{#each cards as card (card.id)}
			<SingleCard
				{card}
				{imgCover}
				{disabled}
				{handleChoice}
				flipped={card === choiceOne || card === choiceTwo || card.matched}
			/>
		{/each}
	</div>
	<p>
		Turnos: {turns}
	</p>
</div>

<style>
	.jogo {
		max-width: 860px;
		margin: 0 auto;
		background: #1b1523;
		min-height: 100vh;
		text-align: center;
		padding: 1rem;
		color: white;
	}
	h1 {
		color: white;
	}
	button {
		background: none;
		border: 2px solid #fff;
		padding: 6px 12px;
		border-radius: 4px;
		color: #fff;
		font-weight: bold;
		cursor: pointer;
		font-size: 1em;
	}
	button:hover {
		background: #c23866;
		color: #fff;
	}
	.card-grid {
		margin-top: 40px;
		display: grid;
		grid-template-columns: repeat(4, 1fr);
		grid-gap: 20px;
	}
</style>

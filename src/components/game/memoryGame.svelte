<script>
	import SingleCard from './singleCard.svelte';

	let imgCover =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/cover.png';
	let imgHelmet =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/helmet-1.png';
	let imgPotion =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/potion-1.png';
	let imgRing =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/ring-1.png';
	let imgScroll =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/scroll-1.png';
	let imgShield =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/shield-1.png';
	let imgSword =
		'https://raw.githubusercontent.com/iamshaunjp/React-Firebase/lesson-58/magic-memory/public/img/sword-1.png';

	const cardImages = [
		{ src: imgHelmet, matched: false },
		{ src: imgPotion, matched: false },
		{ src: imgRing, matched: false },
		{ src: imgScroll, matched: false },
		{ src: imgShield, matched: false },
		{ src: imgSword, matched: false }
	];

	let cards = [];
	let turns = 0;
	let choiceOne = null;
	let choiceTwo = null;
	let disabled = false;

	// shuffle cards
	const shuffledCards = () => {
		const shuffledCards = [...cardImages, ...cardImages]
			.sort(() => Math.random() - 0.5)
			.map((card) => ({ ...card, id: Math.random() }));
		cards = shuffledCards;
		turns = 0;
	};

	// 	handle a choice
	const handleChoice = (card) => {
		choiceOne ? (choiceTwo = card) : (choiceOne = card);
	};

	// 	compare 2 selected cards
	$: if (choiceOne && choiceTwo) {
		disabled = true;
		if (choiceOne.src === choiceTwo.src) {
			console.log('those cards match');
			cards = cards.map((card) => {
				if (card.src === choiceOne.src) {
					return { ...card, matched: true };
				} else {
					return card;
				}
			});
			resetTurn();
		} else {
			console.log('those cards do not match');
			setTimeout(() => resetTurn(), 1000);
		}
	}

	$: console.log(cards);

	// 	start a game automatically
	$: shuffledCards();

	// reset choices & increase turn
	const resetTurn = () => {
		choiceOne = null;
		choiceTwo = null;
		turns = turns + 1;
		disabled = false;
	};
</script>

<div class="App">
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
		Turns: {turns}
	</p>
</div>
/style>

<style>
	.App {
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

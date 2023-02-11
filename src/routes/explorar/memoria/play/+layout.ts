import { collection, getDocs, query } from 'firebase/firestore';
import { db } from 'src/lib/services/firebase';
import type { Carta } from 'src/types/memoria';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async () => {
	const cardsRef = collection(db, 'jogos/memoria/cartas');
	const q = query(cardsRef);
	let cartas: Carta[] = [];
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((carta) => {
		cartas.push(carta.data() as Carta);
	});
	const numCards = Math.floor(Math.random() * 4) + 3;
	cartas = cartas.sort(() => Math.random() - 0.5).slice(0, numCards);
	return { cartas };
};

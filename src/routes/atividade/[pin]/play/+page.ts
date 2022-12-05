import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from 'src/lib/services/firebase';
import type { Carta } from 'src/types/memoria';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { atividade } = await parent();
	const { config } = atividade;

	const cardsRef = collection(db, 'jogos/memoria/cartas');
	const q = query(cardsRef, where('id', 'in', config));
	let cartas: Carta[] = [];
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((carta) => {
		cartas.push(carta.data() as Carta);
	});
	return { cartas };
};

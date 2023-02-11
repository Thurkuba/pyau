import { collection, FieldPath, getDocs, query, where } from 'firebase/firestore';
import { omit } from 'lodash-es';
import { db } from 'src/lib/services/firebase';
import type { Carta } from 'src/types/memoria';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ parent }) => {
	const { atividade } = await parent();
	const { config } = atividade;

	const cardsRef = collection(db, 'jogos/memoria/cartas');
	const q = query(cardsRef, where(new FieldPath('__name__'), 'in', config));
	let cartas: Carta[] = [];
	const querySnapshot = await getDocs(q);
	querySnapshot.forEach((carta) => {
		cartas.push(omit(carta.data(), 'id') as Carta);
	});
	return { cartas };
};

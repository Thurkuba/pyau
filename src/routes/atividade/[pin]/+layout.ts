import { error } from '@sveltejs/kit';
import { doc, getDoc } from 'firebase/firestore';
import { db } from 'src/lib/services/firebase';
import type { Atividade } from 'src/stores/activitiesStore';
import type { LayoutLoad } from './$types';

export const load: LayoutLoad = async ({ params }) => {
	const { pin } = params;
	const docRef = doc(db, 'atividades', pin);
	const docSnap = await getDoc(docRef);
	console.log(docSnap);

	if (!docSnap.exists()) {
		throw error(404, 'Atividade não encontrada');
	}

	const atividade: Atividade = {
		nome: docSnap.data().nome,
		jogo: docSnap.data().jogo,
		config: docSnap.data().config,
		completo: docSnap.data().completo,
		pin: pin,
		timestamp: docSnap.data().timestamp,
		prof: docSnap.data().prof
	};
	return { atividade };
};

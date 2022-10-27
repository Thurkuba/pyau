import { writable } from 'svelte/store';
import { db } from 'src/lib/services/firebase';
import { collection, getDocs } from 'firebase/firestore';

export type Carta = {
	nomeguarani: string;
	nomept: string;
	descricao: string;
	imagem: string;
};
export type MemoStore = {
	cartas: Carta[];
	loaded: boolean;
};

const memoStore = writable<MemoStore>({
	cartas: [],
	loaded: false
});

const getCards = async () => {
	const querySnapshot = await getDocs(collection(db, 'jogos/memoria/cartas'));
	let array: Carta[] = [];
	querySnapshot.forEach((doc) => {
		console.log(doc.id, '-->', doc.data());
		array.push({
			nomeguarani: doc.data()['nome-guarani'],
			nomept: doc.data()['nome-pt'],
			descricao: doc.data().descricao,
			imagem: doc.data().imagem
		});

		memoStore.set({
			cartas: array,
			loaded: true
		});
	});
};
export { getCards, memoStore };

import { writable } from 'svelte/store';
import { db } from 'src/lib/services/firebase';
import { collection, getDocs, addDoc } from 'firebase/firestore';

export type Carta = {
	nomeguarani: string;
	nomept: string;
	descricao: string;
	imagem: string;
};
export type MemoStore = {
	cartas: Carta[];
	loaded: boolean;
	cartasObj: any;
};

const memoStore = writable<MemoStore>({
	cartas: [],
	loaded: false,
	cartasObj: {}
});

const getCards = async () => {
	const querySnapshot = await getDocs(collection(db, 'jogos/memoria/cartas'));
	let array: Carta[] = [];
	let obj = {};
	querySnapshot.forEach((doc) => {
		array.push({
			nomeguarani: doc.data()['nome-guarani'],
			nomept: doc.data()['nome-pt'],
			descricao: doc.data().descricao,
			imagem: doc.data().imagem
		});
		obj[doc.data()['nome-guarani']] = {
			nomeguarani: doc.data()['nome-guarani'],
			nomept: doc.data()['nome-pt'],
			descricao: doc.data().descricao,
			imagem: doc.data().imagem
		};

		memoStore.set({
			cartas: array,
			loaded: true,
			cartasObj: obj
		});
	});
};

const createCard = async (data: Carta) => {
	const docRef = await addDoc(collection(db, 'jogos/memoria/cartas'), {
		'nome-guarani': data.nomeguarani,
		'nome-pt': data.nomept,
		descricao: data.descricao,
		imagem: data.imagem
	});
	memoStore.set({
		loaded: false,
    cartas: [],
    cartasObj: {}
	});
};
export { getCards, createCard, memoStore };

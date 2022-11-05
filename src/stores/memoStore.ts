import { writable } from 'svelte/store';
import { db } from 'src/lib/services/firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
export type Carta = {
	nomeguarani: string;
	nomept: string;
	descricao: string;
	imagem: string;
	id: string;
};
export type MemoStore = {
	cartas: Carta[];
	loaded: boolean;
	// cartasObj: any;
};

const cardsRef = collection(db, 'jogos/memoria/cartas');

const resetStore = () => {
	memoStore.set({
		loaded: false,
		cartas: []
		// cartasObj: {}
	});
};

const memoStore = writable<MemoStore>({
	cartas: [],
	loaded: false
	// cartasObj: {}
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
			imagem: doc.data().imagem,
			id: doc.id
		});
		// obj[doc.data()['nome-guarani']] = {
		// 	nomeguarani: doc.data()['nome-guarani'],
		// 	nomept: doc.data()['nome-pt'],
		// 	descricao: doc.data().descricao,
		// 	imagem: doc.data().imagem,
		// 	id: doc.id
		// };

		memoStore.set({
			cartas: array,
			loaded: true
			// cartasObj: obj
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
	resetStore();
};

const editCard = async (id: string, data: Carta) => {
	const docRef = doc(cardsRef, id);
	console.log('editando carta ', id, 'campos novos: ', data);
	const res = await updateDoc(docRef, data);

	resetStore();
};

const deleteCard = async (id: string) => {
	const docRef = doc(cardsRef, id);
	const res = await deleteDoc(docRef);
	resetStore();
};

export { getCards, createCard, editCard, deleteCard, memoStore };

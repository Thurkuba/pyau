import { writable } from 'svelte/store';
import { db } from 'src/lib/services/firebase';
import { collection, doc, getDocs, addDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import type { Carta } from 'src/types/memoria';
import { omit } from 'lodash-es';

export type MapCarta = {
	[id: string]: Carta;
};

export type MemoStore = {
	cartas: Carta[];
	loaded: boolean;
	mapCarta: MapCarta;
};

const cardsRef = collection(db, 'jogos/memoria/cartas');

const resetStore = () => {
	memoStore.set({
		loaded: false,
		cartas: [],
		mapCarta: {}
	});
};

const memoStore = writable<MemoStore>({
	cartas: [],
	loaded: false,
	mapCarta: {}
});

const getCards = async () => {
	const querySnapshot = await getDocs(collection(db, 'jogos/memoria/cartas'));
	let array: Carta[] = [];
	let map: MapCarta = {};
	querySnapshot.forEach((doc) => {
		const cardInfo: Carta = {
			nomeguarani: doc.data().nomeguarani,
			nomept: doc.data().nomept,
			descricao: doc.data().descricao,
			imagem: doc.data().imagem,
			id: doc.id
		};
		array.push(cardInfo);
		map[doc.id] = cardInfo;
	});
	memoStore.set({
		cartas: array,
		loaded: true,
		mapCarta: map
	});
};

const createCard = async (data: Carta) => {
	const docRef = await addDoc(collection(db, 'jogos/memoria/cartas'), {
		nomeguarani: data.nomeguarani,
		nomept: data.nomept,
		descricao: data.descricao,
		imagem: data.imagem
	});
	console.log(docRef);
	resetStore();
};

const editCard = async (id: string, data: Carta) => {
	const docRef = doc(cardsRef, id);
	const newData = omit(data, ['id']);
	console.log('editando carta ', id, 'campos novos: ', newData);
	await updateDoc(docRef, newData);

	resetStore();
};

const deleteCard = async (id: string) => {
	const docRef = doc(cardsRef, id);
	await deleteDoc(docRef);
	resetStore();
};

export { getCards, createCard, editCard, deleteCard, memoStore };

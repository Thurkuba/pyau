import { get, writable } from 'svelte/store';
import { profileStore } from './profileStore';
import { db } from 'src/lib/services/firebase';
import { collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import type { Atividade } from 'src/types/atividade';

export type ActivitiesStore = {
	atividades: Atividade[];
	loaded: boolean;
};

export type ActivityStore = {
	atividade: Atividade;
	loaded: boolean;
};

const activitiesStore = writable<ActivitiesStore>({
	atividades: [],
	loaded: false
});

const profStore = get(profileStore);
const collectionPath = 'atividades';

const getActivities = async () => {
	const querySnapshot = await getDocs(collection(db, collectionPath));
	let array: Atividade[] = [];
	querySnapshot.forEach((doc) => {
		array.push({
			nome: doc.data().nome,
			jogo: doc.data().jogo,
			config: doc.data().config,
			completo: doc.data().completo,
			pin: doc.id,
			timestamp: doc.data().timestamp,
			prof: profStore.uid
		});
	});
	array.sort((a, b) => {
		return b.timestamp - a.timestamp;
	});
	activitiesStore.set({
		atividades: array,
		loaded: true
	});
};

const createActivity = async (data: Atividade) => {
	const randomPin: string = Math.random().toString(16).substring(2, 5);
	const atividade: Atividade = {
		nome: data.nome,
		config: data.config,
		completo: data.completo,
		pin: randomPin,
		jogo: data.jogo,
		timestamp: Date.now(),
		prof: profStore.uid
	};
	await setDoc(doc(db, collectionPath, randomPin), atividade);
	activitiesStore.update((prev) => ({ ...prev, atividades: [...prev.atividades] }));
};

const editActivity = async (id: string, data: Atividade) => {
	const docRef = doc(db, 'atividades', id);
	await updateDoc(docRef, data);
	activitiesStore.set({
		loaded: false,
		atividades: []
	});
};

const deleteActivity = async (id: string) => {
	const docRef = doc(db, 'atividades', id);
	await deleteDoc(docRef);
	activitiesStore.set({
		loaded: false,
		atividades: []
	});
};

export { activitiesStore, getActivities, createActivity, editActivity, deleteActivity };

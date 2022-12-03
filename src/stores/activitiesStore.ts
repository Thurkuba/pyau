import { get, writable } from 'svelte/store';
import { profileStore } from './profileStore';
import type firebase from 'firebase/database';
import { db } from 'src/lib/services/firebase';
import {
	collection,
	doc,
	getDocs,
	setDoc,
	getDoc,
	addDoc,
	updateDoc,
	deleteDoc
} from 'firebase/firestore';

export type Atividade = {
	nome: string;
	jogo: string;
	config: string[];
	completo: string[];
	pin: string;
	timestamp: number;
	prof: string;
};

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

const activityStore = writable<ActivityStore>({
	atividade: {
		nome: '',
		jogo: '',
		config: [],
		completo: [],
		pin: '',
		timestamp: 0,
		prof: ''
	},
	loaded: false
});

const profStore = get(profileStore);
const userId = profStore.uid;
const collectionPath = 'atividades';

const getActivity = async (pin: string) => {
	const docRef = doc(db, 'atividades', pin);
	const docSnap = await getDoc(docRef);

	if (docSnap.exists()) {
		activityStore.set({
			atividade: {
				nome: docSnap.data().nome,
				jogo: docSnap.data().jogo,
				config: docSnap.data().config,
				completo: docSnap.data().completo,
				pin: pin,
				timestamp: docSnap.data().timestamp,
				prof: docSnap.data().prof
			},
			loaded: true
		});
	}
};

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
	const randomPin: string = Math.random().toString(16).substr(2, 5);
	const docRef = await setDoc(doc(db, collectionPath, randomPin), {
		// const docRef = await addDoc(collection(db, collectionPath), {
		// imagem: data.imagem
		nome: data.nome,
		config: data.config,
		completo: data.completo,
		pin: randomPin,
		jogo: data.jogo,
		timestamp: Date.now(),
		prof: profStore.uid
	});
	console.log(docRef);
	activitiesStore.set({
		atividades: [],
		loaded: false
	});
};

// const deleteActivity = async (id: string) => {
// 	const docRef = doc('atividades', id);
// 	const res = await deleteDoc(docRef);
// activityStore.update({
// 	loaded: false
// });
// };

export { activitiesStore, getActivities, activityStore, getActivity, createActivity };

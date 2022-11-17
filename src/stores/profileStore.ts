import { writable } from 'svelte/store';
import type firebase from 'firebase/database';
import { auth, db } from 'src/lib/services/firebase';
import { doc, getDoc } from 'firebase/firestore';

export type ProfileStore = {
	nome: string;
	papel: string;
	uid: string;
};
const profileStore = writable<ProfileStore>({
	nome: '',
	papel: '',
	uid: ''
});

auth.onAuthStateChanged(async (user) => {
	if (user) {
		const userId = user?.uid;
		const docRef = doc(db, 'users', userId);
		const docSnap = await getDoc(docRef);

		if (docSnap.exists()) {
			profileStore.set({
				nome: docSnap.data().nome,
				papel: docSnap.data().papel,
				uid: userId
			});
		}
	}
});

const signOut = () => {
	auth.signOut();
	console.log('signing out');
	profileStore.set({
		nome: '',
		papel: '',
		uid: ''
	});
};
export { profileStore, signOut };

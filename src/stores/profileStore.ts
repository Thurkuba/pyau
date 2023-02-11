import { writable } from 'svelte/store';
import { auth, db } from 'src/lib/services/firebase';
import { doc, getDoc } from 'firebase/firestore';

export type ProfileStore = {
	nome: string;
	papel: string;
	uid: string;
	loaded: boolean;
};

const emptyProfile = (loaded: boolean = false): ProfileStore => ({
	nome: '',
	papel: '',
	uid: '',
	loaded
});

const profileStore = writable<ProfileStore>(emptyProfile());

auth.onAuthStateChanged(async (user) => {
	console.log('auth changed', user);
	if (user) {
		const userId = user?.uid;
		const docRef = doc(db, 'users', userId);
		const docSnap = await getDoc(docRef);

		console.log('docSnap', docSnap.exists());
		if (docSnap.exists()) {
			profileStore.set({
				nome: docSnap.data().nome,
				papel: docSnap.data().papel,
				uid: userId,
				loaded: true
			});
		} else profileStore.set(emptyProfile(true));
	} else profileStore.set(emptyProfile());
});

const signOut = () => {
	auth.signOut();
	console.log('signing out');
};

export { profileStore, signOut };

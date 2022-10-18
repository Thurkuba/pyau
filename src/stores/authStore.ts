import { writable } from 'svelte/store';
import type firebase from 'firebase/auth';
import { auth } from 'src/lib/services/firebase';

export type AuthStore = {
	isLoggedIn: boolean;
	loaded: boolean;
	user: firebase.User | null;
};
const authStore = writable<AuthStore>({
	isLoggedIn: false,
	loaded: false,
	user: null
});

auth.onAuthStateChanged((user) => {
	authStore.set({
		isLoggedIn: user !== null,
		loaded: true,
		user
	});
});
export default {
	subscribe: authStore.subscribe,
	set: authStore.set
};

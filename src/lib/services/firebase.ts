import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
	apiKey: 'AIzaSyC6LPlsA1tKz00FXCNcCvAJPCvoqJBd1ho',
	authDomain: 'pyau-c86a6.firebaseapp.com',
	projectId: 'pyau-c86a6',
	storageBucket: 'pyau-c86a6.appspot.com',
	messagingSenderId: '1097784263533',
	appId: '1:1097784263533:web:bfa987ad2ecf9af2a75064',
	measurementId: 'G-N6N2SFCF18'
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);

export { app, auth, db };

import { initializeApp } from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';




// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDCC-Q3AUg-H0H7uHA7DCvcrulHfv_jowk",
    authDomain: "netflixclone-60e08.firebaseapp.com",
    projectId: "netflixclone-60e08",
    storageBucket: "netflixclone-60e08.appspot.com",
    messagingSenderId: "413633669318",
    appId: "1:413633669318:web:fffd6f66a00c93efd10fc7",
    measurementId: "G-FVZXCHG85P"
  };

const FirebaseApp = initializeApp(firebaseConfig)


export const auth = getAuth(FirebaseApp)
export const  db = getFirestore(FirebaseApp)
export const storage = getStorage(FirebaseApp)

export default FirebaseApp





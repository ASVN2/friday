import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { serverTimestamp } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: 'AIzaSyAfsU4y4ahhGINHtkMw6oCeDTtggOQMf2o',
  authDomain: 'friday-e0a4a.firebaseapp.com',
  projectId: 'friday-e0a4a',
  storageBucket: 'friday-e0a4a.appspot.com',
  messagingSenderId: '113800545183',
  appId: '1:113800545183:web:63f404ba9878ae67bff3aa',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const timestamp = serverTimestamp();
const storage = getStorage(app);

export { timestamp, auth, db, storage };

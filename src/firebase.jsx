import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDrHl3WH9f1AfWLBFK9Up2Q6ENgw2lXvos",
    authDomain: "movie-app-poppins.firebaseapp.com",
    projectId: "movie-app-poppins",
    storageBucket: "movie-app-poppins.appspot.com",
    messagingSenderId: "529877872439",
    appId: "1:529877872439:web:d49582c5ec95301fa0b4b2"
  };
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };

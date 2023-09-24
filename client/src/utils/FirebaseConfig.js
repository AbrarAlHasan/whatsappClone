import {initializeApp} from 'firebase/app'
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyC8gQC69wrNxtrZz2m19MyAiErwW59ZTbw",
    authDomain: "whatsappclone-f8e4c.firebaseapp.com",
    projectId: "whatsappclone-f8e4c",
    storageBucket: "whatsappclone-f8e4c.appspot.com",
    messagingSenderId: "180171509600",
    appId: "1:180171509600:web:531d7eb63b7a1ebec19805",
    measurementId: "G-G7Q4KLVX5L"
  };

const app = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(app);
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { GoogleAuthProvider, signInWithPopup, getAuth } from 'firebase/auth';


const firebaseConfig = {
  apiKey: "AIzaSyC72yyElRkTUKX5p8BMmI3rYNxC-LFfJOw",
  authDomain: "chat-app-2bcc6.firebaseapp.com",
  projectId: "chat-app-2bcc6",
  storageBucket: "chat-app-2bcc6.appspot.com",
  messagingSenderId: "860118795060",
  appId: "1:860118795060:web:3b97547879cb292a325b61",
  measurementId: "G-EYWPBWPNNQ"
};

async function loginWithGoogle() {
  try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth();

      const { user } = await signInWithPopup(auth, provider);

      return { uid: user.uid, displayName: user.displayName };
  } catch (error) {
      if (error.code !== 'auth/cancelled-popup-request') {
          console.error(error);
      }

      return null;
  }
}

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { loginWithGoogle };

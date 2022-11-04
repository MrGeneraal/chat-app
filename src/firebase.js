import { initializeApp } from "firebase/app";
import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp,
    onSnapshot,
    query,
    orderBy,
    setDoc, doc
} from 'firebase/firestore';
import {GoogleAuthProvider, signInWithPopup, getAuth, updateProfile} from 'firebase/auth';
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyC72yyElRkTUKX5p8BMmI3rYNxC-LFfJOw",
    authDomain: "chat-app-2bcc6.firebaseapp.com",
    projectId: "chat-app-2bcc6",
    storageBucket: "chat-app-2bcc6.appspot.com",
    messagingSenderId: "860118795060",
    appId: "1:860118795060:web:3b97547879cb292a325b61",
    measurementId: "G-EYWPBWPNNQ"
};

// export async function sendMessage(roomId, user, text) {
//   try {
//       await addDoc(collection(db, 'chat-rooms', roomId, 'messages'), {
//           uid: user.uid,
//           displayName: user.displayName,
//           text: text.trim(),
//           timestamp: serverTimestamp(),
//       });
//   } catch (error) {
//       console.error(error);
//   }
// }
//
// export function getMessages(roomId, callback) {
//   return onSnapshot(
//       query(
//           collection(db, 'chat-rooms', roomId, 'messages'),
//           orderBy('timestamp', 'asc')
//       ),
//       (querySnapshot) => {
//           const messages = querySnapshot.docs.map((doc) => ({
//               id: doc.id,
//               ...doc.data(),
//           }));
//           callback(messages);
//       }
//   );
// }
//
// export function getRooms(callback) {
//     return onSnapshot(
//         query(
//             collection(db, 'chat-rooms')
//         ),
//         (querySnapshot) => {
//             const rooms = querySnapshot.docs.map((doc) => ({
//                 id: doc.id,
//                 ...doc.data(),
//             }));
//
//             callback(rooms);
//         }
//     );
// }


  // try {
  //     const provider = new GoogleAuthProvider();
  //     const auth = getAuth();
  //
  //     const { user } = await signInWithPopup(auth, provider);
  //
  //     return { uid: user.uid, displayName: user.displayName };
  // } catch (error) {
  //     if (error.code !== 'auth/cancelled-popup-request') {
  //         console.error(error);
  //     }
  //
  //     return null;
  // }
// }

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore();
export const auth = getAuth();
export const storage = getStorage();

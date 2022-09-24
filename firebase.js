import firebase from 'firebase/compat/app'
import 'firebase/compat/auth'
import 'firebase/compat/storage'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyC5xEbHHO6KMf3bhBqPCQakOZ59tGlse_A",
  authDomain: "next-js-blog-fahd.firebaseapp.com",
  projectId: "next-js-blog-fahd",
  storageBucket: "next-js-blog-fahd.appspot.com",
  messagingSenderId: "956858781529",
  appId: "1:956858781529:web:108d965323e5bac388c648"
};

if (!firebase.apps.length) firebase.initializeApp(firebaseConfig);


const auth = firebase.auth();
const storage = firebase.storage();
const db = firebase.firestore();
const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp();
export { auth, storage, db, serverTimeStamp }
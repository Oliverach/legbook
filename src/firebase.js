import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import 'firebase/firestore';

const app = firebase.initializeApp({
  apiKey: "AIzaSyAEzBgWiLUfBX63E75161LRE5pccalGvXk",
  authDomain: "legbook-336d0.firebaseapp.com",
  projectId: "legbook-336d0",
  storageBucket: "legbook-336d0.appspot.com",
  messagingSenderId: "690134316072",
  appId: "1:690134316072:web:a71e71a3fd9d579afa311d",
  measurementId: "G-C9E932Z291"
})

export const auth = app.auth()
export const storage = app.storage()
export const firestore =  app.firestore()
export default app

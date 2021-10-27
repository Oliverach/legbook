import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
    apiKey: "AIzaSyAEzBgWiLUfBX63E75161LRE5pccalGvXk",
    authDomain: "legbook-336d0.firebaseapp.com",
    projectId: "legbook-336d0",
    storageBucket: "legbook-336d0.appspot.com",
    messagingSenderId: "690134316072",
    appId: "1:690134316072:web:a71e71a3fd9d579afa311d",
    measurementId: "G-C9E932Z291"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app)

export default app
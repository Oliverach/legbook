import firebase from "firebase/app"
import "firebase/auth"
import "firebase/storage"
import 'firebase/firestore'
//Create your own Config.js 
import config from "./config.js"

 

const app = firebase.initializeApp({
  apiKey: config.apiKey,
  authDomain: config.authDomain,
  projectId: config.projectId,
  storageBucket: config.storageBucket,
  messagingSenderId: config.messagingSenderId,
  appId: config.appId,
  measurementId: config.measurementId
})

export const auth = app.auth()
export const storage = app.storage()
export const firestore =  app.firestore()
export default app

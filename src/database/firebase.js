import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyCiMQdxNAll9VR6RuErySlheGQvAufg-48",
  authDomain: "wirtualna-szafa.firebaseapp.com",
  projectId: "wirtualna-szafa",
  storageBucket: "wirtualna-szafa.appspot.com",
  messagingSenderId: "286716272721",
  appId: "1:286716272721:web:68b3fb1774ea02fa1c9870",
  measurementId: "G-YV39BKDP6H",
});

const database = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { database, auth, storage };

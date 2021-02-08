import firebase from "firebase/app";
import 'firebase/auth';
import 'firebase/storage';
import 'firebase/firestore';
import firebaseConfig from './firebaseConfig';

firebase.initializeApp(firebaseConfig);

const database = firebase.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { database, auth, storage };

export default firebase;
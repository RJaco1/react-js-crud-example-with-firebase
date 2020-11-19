import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB3WHw7bICvDgVhjffAWRbpIK6I_wUWAao",
    authDomain: "crud-curso-react.firebaseapp.com",
    databaseURL: "https://crud-curso-react.firebaseio.com",
    projectId: "crud-curso-react",
    storageBucket: "crud-curso-react.appspot.com",
    messagingSenderId: "631762531607",
    appId: "1:631762531607:web:4868c75f09accf2887f352"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export { firebase }
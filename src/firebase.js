import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


const firebaseConfig = {
    apiKey: "AIzaSyDuD_OXedXvJrkg_pkE_gXODSyiXA5UjEM",
    authDomain: "point-of-sales-786ed.firebaseapp.com",
    projectId: "point-of-sales-786ed",
    storageBucket: "point-of-sales-786ed.appspot.com",
    messagingSenderId: "162597180069",
    appId: "1:162597180069:web:0393c6b716769b6b5ef34c"
  };

firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();

export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
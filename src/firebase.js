import * as firebase from 'firebase';


const firebaseConfig = {
    apiKey: "AIzaSyCBtpPYl_o9rE923uls8hfS8Zr9cnJLSjY",
    authDomain: "ecommerce-e6e23.firebaseapp.com",
    databaseURL: "https://ecommerce-e6e23.firebaseio.com",
    projectId: "ecommerce-e6e23",
    storageBucket: "ecommerce-e6e23.appspot.com",
    messagingSenderId: "510985279514",
    appId: "1:510985279514:web:76fc34fe3a26e0c9cc59a3"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();   


   
import firebase from "firebase/app";
import "firebase/firestore";

var firebaseConfig = {
    apiKey: "AIzaSyD0PsCKf7ZjZKdlG0caZyYnfQcyCPXxPk0",
    authDomain: "recipe-app-a49d9.firebaseapp.com",
    databaseURL: "https://recipe-app-a49d9.firebaseio.com",
    projectId: "recipe-app-a49d9",
    storageBucket: "recipe-app-a49d9.appspot.com",
    messagingSenderId: "1098024439963",
    appId: "1:1098024439963:web:179462f4d608b847"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;

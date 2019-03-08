const firebase = require("firebase");
// Required for side-effects
require("firebase/firestore");

const firebaseConfig = {
  apiKey: "AIzaSyCFtU5-3tdnzSlzYoK2fkHnklWzeB9Q-D8",
    authDomain: "uw-rate-em-4f9d6.firebaseapp.com",
    databaseURL: "https://uw-rate-em-4f9d6.firebaseio.com",
    projectId: "uw-rate-em-4f9d6",
    storageBucket: "uw-rate-em-4f9d6.appspot.com",
    messagingSenderId: "713726718555"
};

firebase.initializeApp(firebaseConfig);
export default firebase
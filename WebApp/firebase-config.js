// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
import { getAuth } from "firebase/auth";
import { getMessaging, getToken, onMessage } from "firebase/messaging";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCpHeNK7Fow9BlM1XMVBh_CPQf-8_f7AYM",
  authDomain: "tobi-monitoring-system.firebaseapp.com",
  databaseURL: "https://tobi-monitoring-system-default-rtdb.firebaseio.com",
  projectId: "tobi-monitoring-system",
  storageBucket: "tobi-monitoring-system.appspot.com",
  messagingSenderId: "812392646842",
  appId: "1:812392646842:web:246b4e79e34884574d9a83",
  measurementId: "G-GRB8DCDSKE"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getDatabase(app);
const analytics = getAnalytics(app);
const messaging = getMessaging(app);

/* export const gettoken = (setTokenFound) => {
  return getToken(messaging, {vapidKey: 'BN97zu_a9RSkbpWzrJRejCTxLJS42tJi7O6TJsBqnPjbiM9WhLJrDYgU-gssgWLI0Z21JWLzgxxxTacmP1syNRw'}).then((currentToken) => {
    if (currentToken) {
      console.log('current token for client: ', currentToken);
      setTokenFound(true);
      // Track the token -> client mapping, by sending to backend server
      // show on the UI that permission is secured
    } else {
      console.log('No registration token available. Request permission to generate one.');
      setTokenFound(false);
      // shows on the UI that permission is required 
    }
  }).catch((err) => {
    console.log('An error occurred while retrieving token. ', err);
    // catch error while creating client token
  });
}

export const onMessageListener = () =>
  new Promise((resolve) => {
    onMessage(messaging, (payload) => {
      resolve(payload);
    });
}); */


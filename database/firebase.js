import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBOEUnVSZeG71bSI9MtJIBiPyBDvNhJxZY",
    authDomain: "clima-app-330015.firebaseapp.com",
    projectId: "clima-app-330015",
    storageBucket: "clima-app-330015.appspot.com",
    messagingSenderId: "1035827652149",
    appId: "1:1035827652149:web:14a7c665aa31a67cde737c",
    measurementId: "G-Z0QYF4Y9DF"
  };
  
  // Initialize Firebase
  const db = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);

export default {
    firebase,
    db,
    analytics
}
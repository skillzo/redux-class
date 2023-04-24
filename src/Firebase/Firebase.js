import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCVrTd5GzEiv-IAXTekrzBy4OevXsoLGUk",
  authDomain: "redux-9c451.firebaseapp.com",
  projectId: "redux-9c451",
  storageBucket: "redux-9c451.appspot.com",
  messagingSenderId: "393266203089",
  appId: "1:393266203089:web:427af4f9a4d0350371b8f0",
  measurementId: "G-NE08YM244S",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
// export const db = getFirestore(app);
const analytics = getAnalytics(app);

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAuUADRigS4ig8-S5sUHGdPcMRQYPIgSLI",
  authDomain: "twiiter-application.firebaseapp.com",
  projectId: "twiiter-application",
  storageBucket: "twiiter-application.appspot.com",
  messagingSenderId: "620402074433",
  appId: "1:620402074433:web:57c0a5ab154668a51137c0",
  measurementId: "G-XC0ZEDJDYD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app); 
export default auth;
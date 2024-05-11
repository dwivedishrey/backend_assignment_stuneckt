import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth"

const firebaseConfig = {
  apiKey: "AIzaSyAn4uR5bLqbwlYEJbeVEwCv6HtJQyOOQms",
  authDomain: "internship-9c8ab.firebaseapp.com",
  projectId: "internship-9c8ab",
  storageBucket: "internship-9c8ab.appspot.com",
  messagingSenderId: "1040427776279",
  appId: "1:1040427776279:web:6b79e45f2d2338ee409f52",
  measurementId: "G-4ELX0H70SP"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth=getAuth(app); 
export default auth;

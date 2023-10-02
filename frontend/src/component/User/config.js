// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDWVdpZYPVqHcwFsxcnsDjSf5pgGHlTRc8",
  authDomain: "ead-spm-project.firebaseapp.com",
  projectId: "ead-spm-project",
  storageBucket: "ead-spm-project.appspot.com",
  messagingSenderId: "452444343416",
  appId: "1:452444343416:web:fd7965d0c1023fbad3318d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth =getAuth(app)
const provider = new GoogleAuthProvider();
export {auth,provider};
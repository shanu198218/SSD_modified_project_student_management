import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const firebaseConfig = {

  apiKey: "AIzaSyCZUlLDR-mFpc_gYNzaXSb3yFWbuqHuoLw",

  authDomain: "demofile-b2653.firebaseapp.com",

  projectId: "demofile-b2653",

  storageBucket: "demofile-b2653.appspot.com",

  messagingSenderId: "102342431435",

  appId: "1:102342431435:web:45d3431bd4f7f124a0414e",

  measurementId: "G-89XV2NM5YR"

};

export const app = initializeApp(firebaseConfig)
export const storage = getStorage(app);
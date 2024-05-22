import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'

const firebaseConfig = {
    apiKey: "AIzaSyCmxNgTHjasW5QUk4VU3YCqg6IrZzIhEHw",
    authDomain: "usermanagement1-3dd8e.firebaseapp.com",
    projectId: "usermanagement1-3dd8e",
    storageBucket: "usermanagement1-3dd8e.appspot.com",
    messagingSenderId: "668522588062",
    appId: "1:668522588062:web:b8f738b4d187981ea6988f",
    measurementId: "G-2CNJQRN3NH"
  };
  const app = initializeApp(firebaseConfig)
  const storage = getStorage(app)
  export {storage}


// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyAKZ5PXvNe5As62NVEfbUi0VQd8blt-Ugs',
  authDomain: 'chatgpt-clone-1ae8d.firebaseapp.com',
  projectId: 'chatgpt-clone-1ae8d',
  storageBucket: 'chatgpt-clone-1ae8d.appspot.com',
  messagingSenderId: '54214517206',
  appId: '1:54214517206:web:a7990ae8263581a5aac477',
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

const db = getFirestore(app);

export { app, db };

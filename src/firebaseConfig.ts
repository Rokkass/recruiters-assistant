import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyA-Fmx7u8ETJoPggb36U4MUoue0zYEeQDc',
  authDomain: 'recruiters-assistant.firebaseapp.com',
  projectId: 'recruiters-assistant',
  storageBucket: 'recruiters-assistant.appspot.com',
  messagingSenderId: '303073489399',
  appId: '1:303073489399:web:1718823450cbcff11d7ef2',
  measurementId: 'G-PJMNN4PXF8',
};

// init firebase app
export const app = initializeApp(firebaseConfig);
// init services
export const db = getFirestore();

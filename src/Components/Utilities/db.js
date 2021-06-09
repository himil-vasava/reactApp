import firebase from 'firebase/app'
import {firestore} from 'firebase/firestore'

const firebaseConfig = {
  apiKey:`${process.env.REACT_APP_API_KEY}`,
  authDomain:`${process.env.REACT_APP_AUTH_DOMAIN}`,
  databaseURL: `${process.env.REACT_APP_DATA_URL}`,
  projectId: `${process.env.REACT_APP_ID}`,
  storageBucket: `${process.env.REACT_APP_STORAGE_BUCKET}`,
  messagingSenderId: `${process.env.REACT_APP_MESSAGE_ID}`,
  appId: `${process.env.REACT_APP_APP_ID}`,
  measurementId: `${process.env.REACT_APP_MEASUREMENT_ID}`
};
  // Initialize Firebase
const firebaseApp=firebase.initializeApp(firebaseConfig);
  
export default firebaseApp;
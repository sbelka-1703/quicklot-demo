
import { getApps, initializeApp } from 'firebase/app';
import {getFirestore} from '@firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyC1FAk9tpMwW27Ax6X7_Je6TGoLCC1Kr2k",
    authDomain: "hcg-lot-exp.firebaseapp.com",
    projectId: "hcg-lot-exp",
    storageBucket: "hcg-lot-exp.appspot.com",
    messagingSenderId: "493314842301",
    appId: "1:493314842301:web:060ac53c45d128f638e1d4",
    measurementId: "G-EF36YB7GSQ"
  };
if (!getApps().length) app = initializeApp(firebaseConfig)



export const db = getFirestore(app)
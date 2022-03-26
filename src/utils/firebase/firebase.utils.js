import { initializeApp } from 'firebase/app'; //creates app instance based on config -- object that we attach to the one is created in firebase console.

//authentication
import { 
    getAuth,
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged } from 'firebase/auth';

//firebase firestore
import {
    getFirestore,
    doc, //retrieve firestore database documents
    getDoc, //get documents data
    setDoc  //set documents data
} from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCgRqJw7samQZa7JuFmr27v-Lv7Pn5D5oo",
    authDomain: "crown-clothing-db-743a3.firebaseapp.com",
    projectId: "crown-clothing-db-743a3",
    storageBucket: "crown-clothing-db-743a3.appspot.com",
    messagingSenderId: "1093072147559",
    appId: "1:1093072147559:web:ac63ac2a7f99e3557e70c2"
  };
  
// Initialize Firebase
const app = initializeApp(firebaseConfig);

//init provider using googleAuthprovider class
const provider = new GoogleAuthProvider();

//take config object and tell provider how to behave.
provider.setCustomParameters({
    prompt: 'select_account'
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();

export const createUserDocumentFromAuth =  async (userAuth, additionalInformation = {}) => {
    if (!userAuth) return;
    const userDocRef = doc(db, 'users', userAuth.uid);

    const userSnapshot = await getDoc(userDocRef);


    //if user data does not exist, create/set the document with the data from user auth in collecting using user snapshot
    if (!userSnapshot.exists()) {
        const { displayName, email } = userAuth;
        const createdAt = new Date();

        try {
            await setDoc(userDocRef, {
                displayName,
                email,
                createdAt,
                ...additionalInformation
            });
        } catch (error) {
            console.log('error creating the user', error.message)
        }
    }

    //if user data exists, do nothing


    //return userDocRef
    return userDocRef;
};

export const createAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await createUserWithEmailAndPassword(auth, email, password);
}

export const signInAuthUserWithEmailAndPassword = async (email, password) => {
    if (!email || !password) return;

    return await signInWithEmailAndPassword(auth, email, password);
}

export const signOutUser = async () => signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth, callback);
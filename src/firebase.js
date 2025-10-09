// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { addDoc, collection, getFirestore } from "firebase/firestore";
import { toast } from "react-toastify";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDFeh6qnVG-uMTrwh7frnFczuK0y8YtOxo",
  authDomain: "netflix-clone-8aba4.firebaseapp.com",
  projectId: "netflix-clone-8aba4",
  storageBucket: "netflix-clone-8aba4.firebasestorage.app",
  messagingSenderId: "547054075552",
  appId: "1:547054075552:web:9f41591fe22ff71203d3c5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// myself
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async(name, email, password) => {
    try {
        const res = await createUserWithEmailAndPassword(auth, email, password);
        const user = res.user;
        await addDoc(collection(db, "user"), {
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        });
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const login = async(email, password) => {
    try {
        await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}

const logout = ()=>{
    signOut(auth);
}

export {auth, db, login, signup, logout};
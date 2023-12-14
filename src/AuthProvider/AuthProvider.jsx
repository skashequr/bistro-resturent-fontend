import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";

export const AuthContex = createContext(null);
import { auth } from "../Firebase/firebase.config";
// const [lodder , setlodder] = (true);
const AuthProvider = ({children}) => {
    const [user , setUser] = useState(null);
    
    const createUserWithEmailAndpass = (email, password) =>{

        return createUserWithEmailAndPassword(auth , email, password);
    }
    const loginWithEmail = (email, password) =>{
       
        return signInWithEmailAndPassword(auth, email, password);
    }
    const logOut = () => {
       
        return signOut(auth)
          
      };
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
           
            setUser(user);
          
        });
    
        return () => {
          unsubscribe();
        };
      }, []);
    
    const authData ={
        createUserWithEmailAndpass,
        loginWithEmail,
        user,
        logOut
    }
    return (
        <AuthContex.Provider value={authData}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthProvider;
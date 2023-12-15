import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createContext, useEffect, useState } from "react";
import useAxiosPublic from "../hooks/useAxiosPublic";
export const AuthContex = createContext(null);
import { auth } from "../Firebase/firebase.config";

const AuthProvider = ({children}) => {
    const [lodder , setlodder] = useState(true);
    const [user , setUser] = useState(null);
    const axiosPublic = useAxiosPublic();
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
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            if (currentUser) {
                // get token and store client
                const userInfo = { email: currentUser.email };
                axiosPublic.post('/jwt', userInfo)
                    .then(res => {
                        if (res.data.token) {
                            localStorage.setItem('access-token', res.data.token);
                            setlodder(false);
                        }
                    })
            }
            else {
                // TODO: remove token (if token stored in the client side: Local storage, caching, in memory)
                localStorage.removeItem('access-token');
                setlodder(false);
            }
            
        });
        return () => {
            return unsubscribe();
        }
    }, [axiosPublic])
    
    const authData ={
        createUserWithEmailAndpass,
        loginWithEmail,
        user,
        logOut,
        lodder
    }
    return (
        <AuthContex.Provider value={authData}>
            {children}
        </AuthContex.Provider>
    );
};

export default AuthProvider;
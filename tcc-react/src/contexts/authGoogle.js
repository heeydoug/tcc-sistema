import * as React from "react";
import {createContext, useEffect, useState} from "react";
import {getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import {app} from "../services/firebaseConfig"
import {Navigate} from "react-router-dom";
import {toast, ToastContainer} from "react-toastify";

const provider = new GoogleAuthProvider();
export const AuthGoogleContext = createContext({});
export const AuthGoogleProvider = ({ children }) => {
    const auth = getAuth(app);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const loadStorageAuth = () => {
            const sessionToken = sessionStorage.getItem("@AuthFirebase:token");
            const sessionUser = sessionStorage.getItem("@AuthFirebase:user");
            if(sessionToken && sessionUser){
                setUser(JSON.parse(sessionUser));
            }
        };
        loadStorageAuth();
    }, []);
    const signInGoogle = () => {
        signInWithPopup(auth, provider)
            .then((result) => {
                const credential = GoogleAuthProvider.credentialFromResult(result);
                const token = credential.accessToken;
                const user = result.user;
                setUser(user)
                sessionStorage.setItem("@AuthFirebase:token", token);
                sessionStorage.setItem("@AuthFirebase:user", JSON.stringify(user));
                toast.success('Login realizado com sucesso!');
            }).catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData.email;
            const credential = GoogleAuthProvider.credentialFromError(error);
            console.log(errorMessage)
        });
    };

    function signOut(){
        sessionStorage.clear();
        setUser(null)
        toast.success('Logout realizado com sucesso!');
        return <Navigate to="/" />
    }

    return (
        <AuthGoogleContext.Provider
        value={{
            signed: !!user,
            user,
            signInGoogle,
            signOut
        }}>
            <ToastContainer position="top-right" autoClose={3000} pauseOnFocusLoss draggable hideProgressBar={false} />
            {children}
        </AuthGoogleContext.Provider>
    )
}
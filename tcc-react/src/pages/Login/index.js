import {useContext} from "react";
import {AuthGoogleContext} from "../../contexts/authGoogle";
import {Navigate} from "react-router-dom";

export const Login = () => {
    const { signInGoogle, signed} = useContext(AuthGoogleContext)
    async function loginGoogle() {
        await signInGoogle()
    }
    if(!signed){
        return <button onClick={loginGoogle}>Logar com o Google</button>
    } else{
        return <Navigate to="/home" />
    }
}

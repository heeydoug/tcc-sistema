import {useContext} from "react";
import {AuthGoogleContext} from "../../contexts/authGoogle";
import {Navigate} from "react-router-dom";
import Box from '@mui/material/Box';
import {Container} from "@mui/material";
import * as React from "react";

export const Login = () => {
    const { signInGoogle, signed} = useContext(AuthGoogleContext)
    async function loginGoogle() {
        await signInGoogle()
    }
    if(!signed){
        return (
            <Container>
                <Box height={30} />
                <Box sx={{ display: 'flex' }}>
                    <button onClick={loginGoogle}>Logar com o Google</button>
                </Box>
            </Container>
            )
    } else{
        return <Navigate to="/home" />
    }
}

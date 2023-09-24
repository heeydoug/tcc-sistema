import {useContext} from "react";
import {AuthGoogleContext} from "../../contexts/authGoogle";
import {Navigate} from "react-router-dom";
import Sidenav from "../../components/sidenav";
import {Container} from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";

export const Usuarios = () => {
    return (
        <Container>
            <Box height={30} />
            <h1>Usuários</h1>
        </Container>

    )
}
import {BrowserRouter, Routes, Router, Route} from "react-router-dom"
import {Login} from "../pages/Login";
import {Home} from "../pages/Home";
import {PrivateRoutes} from "./index";
import {Fragment} from "react";
import {Usuarios} from "../pages/Usuários";
import Sidenav from "../components/sidenav";
import Navbar from "../components/navbar";
import {Redatores} from "../pages/Redatores";
import {Revisores} from "../pages/Revisores";
import {Clientes} from "../pages/Clientes";


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Navbar />
            <Sidenav />
            <Fragment>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/home" element={<PrivateRoutes />}>
                        <Route path="/home" element={<Home />} />
                    </Route>
                    <Route path="/usuarios" element={<Usuarios />} />
                    <Route path="/redatores" element={<Redatores />} />
                    <Route path="/revisores" element={<Revisores />} />
                    <Route path="/clientes" element={<Clientes />} />
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

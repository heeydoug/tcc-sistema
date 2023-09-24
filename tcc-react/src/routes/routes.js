import {BrowserRouter, Routes, Router, Route} from "react-router-dom"
import {Login} from "../pages/Login";
import {Home} from "../pages/Home";
import {PrivateRoutes} from "./index";
import {Fragment} from "react";
import {Usuarios} from "../pages/Usuários";
import Sidenav from "../components/sidenav";
import Navbar from "../components/navbar";


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
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

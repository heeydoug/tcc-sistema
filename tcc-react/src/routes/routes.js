import {BrowserRouter, Routes, Router, Route} from "react-router-dom"
import {Login} from "../pages/Login/login";
import {Home} from "../pages/Home/home";
import {PrivateRoutes} from "./index";
import {Fragment} from "react";
import {Usuarios} from "../pages/Usuários/usuarios";
import Sidenav from "../components/sidenav";
import Navbar from "../components/navbar";
import {Redatores} from "../pages/Redatores/redatores";
import {Revisores} from "../pages/Revisores/revisores";
import {Clientes} from "../pages/Clientes/clientes";
import {Administrador} from "../pages/Admintradores/admin";
import {Artigos} from "../pages/Artigos/artigos";
import {InfoUsuarios} from "../pages/InfoUsuarios/infoUsuarios";
import {HistoricoArtigos} from "../pages/HistóricoArtigos/historicoArtigos";
import {MeusArtigos} from "../pages/MeusArtigos/meusArtigos";


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
                    <Route path="/usuarios" element={<PrivateRoutes />}>
                        <Route path="/usuarios" element={<Usuarios />} />
                    </Route>
                    <Route path="/redatores" element={<PrivateRoutes />}>
                        <Route path="/redatores" element={<Redatores />} />

                    </Route>
                    <Route path="/revisores" element={<PrivateRoutes />}>
                        <Route path="/revisores" element={<Revisores />} />

                    </Route>
                    <Route path="/clientes" element={<PrivateRoutes />}>
                        <Route path="/clientes" element={<Clientes />} />
                    </Route>
                    <Route path="/administradores" element={<PrivateRoutes />}>
                        <Route path="/administradores" element={<Administrador />} />
                    </Route>
                    <Route path="/artigos" element={<PrivateRoutes />}>
                        <Route path="/artigos" element={<Artigos />} />
                    </Route>
                    <Route path="/meus-dados" element={<PrivateRoutes />}>
                        <Route path="/meus-dados" element={<InfoUsuarios />} />
                    </Route>
                    <Route path="/meus-artigos" element={<PrivateRoutes />}>
                        <Route path="/meus-artigos" element={<MeusArtigos />} />
                    </Route>
                    <Route path="/historico-artigos" element={<PrivateRoutes />}>
                        <Route path="/historico-artigos" element={<HistoricoArtigos />} />
                    </Route>
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

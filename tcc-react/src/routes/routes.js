import {BrowserRouter, Routes, Router, Route} from "react-router-dom"
import {Login} from "../pages/Login";
import {Home} from "../pages/Home";
import {PrivateRoutes} from "./index";
import {Fragment} from "react";


export const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Fragment>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/Home" element={<PrivateRoutes />}>
                        <Route path="/Home" element={<Home />} />
                    </Route>
                </Routes>
            </Fragment>
        </BrowserRouter>
    )
}

import {AppRoutes} from "./routes/routes";
import {AuthGoogleProvider} from "./contexts/authGoogle";
import Sidenav from "./components/sidenav";
import { BrowserRouter as Router } from "react-router-dom";
export const App = () => {
    return (
        <AuthGoogleProvider>

            <AppRoutes />

        </AuthGoogleProvider>
    )
}
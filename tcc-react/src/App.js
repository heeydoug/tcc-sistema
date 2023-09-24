import {AppRoutes} from "./routes/routes";
import {AuthGoogleProvider} from "./contexts/authGoogle";

export const App = () => {
    return (
        <AuthGoogleProvider>
            <AppRoutes />
        </AuthGoogleProvider>
    )
}
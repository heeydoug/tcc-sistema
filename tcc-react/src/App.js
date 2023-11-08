import {AppRoutes} from "./routes/routes";
import {AuthGoogleProvider} from "./contexts/authGoogle";
import {useEffect, useState} from "react";
export const App = () => {

    const [pageTitle, setPageTitle] = useState('TCC - Clarisse e Douglas');

    useEffect(() => {
        document.title = pageTitle;
        setPageTitle(pageTitle)
    }, [pageTitle]);
    const handleTitleChange = (event) => {
        setPageTitle(event.target.value);
    };

    return (
        <AuthGoogleProvider>
            <AppRoutes />
        </AuthGoogleProvider>
    )
}
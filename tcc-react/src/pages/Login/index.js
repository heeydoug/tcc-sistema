import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Card, CardContent, Container } from "@mui/material";
import Typography from "@mui/material/Typography"; // Importe o Typography

import "./Login.css";
import '@fontsource/roboto';
export const Login = () => {
    const { signInGoogle, signed } = useContext(AuthGoogleContext);

    async function loginGoogle() {
        await signInGoogle();
    }

    if (!signed) {
        return (
            <div className="center-container">
                <Box height={30} />
                <Card className="card">
                    <CardContent>
                        <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                            <Typography variant="h4" gutterBottom>
                                Login
                            </Typography>
                            <Button
                                variant="contained"
                                color="primary"
                                startIcon={
                                    <img
                                        src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                                        alt="Logo do Google"
                                        width="20"
                                        height="20"
                                    />
                                }
                                sx={{ marginBottom: 2 }}
                                onClick={loginGoogle}
                            >
                                LOGAR com o Google
                            </Button>
                        </Box>
                    </CardContent>
                </Card>
                {/* Espaço para o rodapé */}
                <div className="footer"></div>
                {/* Rodapé */}
                <div className="footerStyle">
                    <Typography >
                        Desenvolvido por Clarisse Diniz e Douglas Almeida @ 2023
                    </Typography>
                </div>
            </div>
        );
    } else {
        return <Navigate to="/home" />;
    }
};

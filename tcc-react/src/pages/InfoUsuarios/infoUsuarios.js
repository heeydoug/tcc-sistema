import React, { useContext } from "react";
import {Card, CardContent, Container, createTheme, Paper, ThemeProvider} from "@mui/material";
import { useAppStore } from "../../configs/appStore";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import { AuthGoogleContext } from "../../contexts/authGoogle";

// Importar makeStyles para criar estilos personalizados
import { makeStyles } from "@mui/styles";
import LogoutIcon from "@mui/icons-material/Logout";

const useStyles = makeStyles((theme) => ({
    container: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "15px",
        borderRadius: "8px",
    },
    title: {
        marginBottom: "20px",
    },
    avatar: {
        width: "100px",
        height: "100px",
        marginBottom: "10px",
    },
    info: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    button: {
        marginTop: "20px",
    },
}));

export const InfoUsuarios = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#1976D2",
            },
        },
    });

    const { user, signOut } = useContext(AuthGoogleContext);
    const userLogged = user;
    const dopen = useAppStore((state) => state.dopen);

    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <div className={`container ${dopen ? "open" : ""}`}>
                <Box height={100} />
                <Container maxWidth="md">
                    <Paper elevation={3}>
                        <Card variant="outlined" sx={{ p: 4, width: "100%" }}>
                            <CardContent>
                                <Box mt={2}>
                                    <div className={classes.container}>
                                        <Typography variant="h3" gutterBottom fontWeight="bold" className={classes.title}>
                                            Meus Dados
                                        </Typography>
                                        <Avatar alt="Profile" src={userLogged.photoURL} className={classes.avatar} />
                                        <div className={classes.info}>
                                            <Typography variant="subtitle1">Nome: {userLogged.displayName}</Typography>
                                            <Typography variant="subtitle1">Email: {userLogged.email}</Typography>
                                        </div>
                                        <Button
                                            variant="outlined"
                                            color="primary"
                                            onClick={() => signOut()}
                                            className={classes.button}
                                        >
                                            <LogoutIcon />  Sair
                                        </Button>
                                    </div>
                                </Box>
                            </CardContent>
                        </Card>

                    </Paper>

                </Container>
            </div>
        </ThemeProvider>
    );
};

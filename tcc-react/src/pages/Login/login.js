import { useContext } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Navigate } from "react-router-dom";
import Box from "@mui/material/Box";
import { Button, Card, CardContent} from "@mui/material";
import Typography from "@mui/material/Typography";
import GoogleIcon from '@mui/icons-material/Google';
import "./login.css";
import '@fontsource/roboto';
import Grid from "@mui/material/Grid";
export const Login = () => {
    const {signInGoogle, signed} = useContext(AuthGoogleContext);

    async function loginGoogle() {
        await signInGoogle();
    }

    // if (!signed) {
    //     return (
    //         <div className="center-container">
    //             <Box height={30} />
    //             <Card className="card">
    //                 <CardContent>
    //                     <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
    //                         <Typography variant="h4" gutterBottom>
    //                             Login
    //                         </Typography>
    //                         <Button
    //                             variant="contained"
    //                             color="primary"
    //                             startIcon={
    //                                 <img
    //                                     src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
    //                                     alt="Logo do Google"
    //                                     width="20"
    //                                     height="20"
    //                                 />
    //                             }
    //                             sx={{ marginBottom: 2 }}
    //                             onClick={loginGoogle}
    //                         >
    //                             LOGAR com o Google
    //                         </Button>
    //                     </Box>
    //                 </CardContent>
    //             </Card>
    //             {/* Espaço para o rodapé */}
    //             <div className="footer"></div>
    //             {/* Rodapé */}
    //             <div className="footerStyle">
    //                 <Typography >
    //                     Desenvolvido por Clarisse Diniz e Douglas Almeida @ 2023
    //                 </Typography>
    //             </div>
    //         </div>
    //     );
    // } else {
    //     return <Navigate to="/home" />;
    // }

    if (!signed) {
        return (
            <div className="center-container">
                <Box height={30} />
                <Grid container spacing={0} sx={{ width: '65%', height: '65%' }} >
                    <Grid item xs={6}
                          style={{
                              backgroundImage: 'repeating-linear-gradient(-45deg, rgba(255,255,255, 0.25), rgba(255,255,255, 0.25) 1px, transparent 1px, transparent 6px)',
                              backgroundSize: '4px 4px',
                              padding: '20px',
                              borderBottomLeftRadius: '20px',
                              borderTopLeftRadius: '20px',
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              justifyContent: 'center',
                              color: 'white',
                              boxShadow: '0px 0px 10px rgba(0.3,0.3, 0.3, 0.3)'
                          }}>
                        <Typography variant="h4" gutterBottom>
                            BEM-VINDO
                        </Typography>

                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '10px' }}>
                                <Button
                                    variant="contained"
                                    startIcon={
                                        <img
                                            src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/24px-Google_%22G%22_Logo.svg.png?20230822192911"
                                            alt="Logo do Google"
                                            width="20"
                                            height="20"
                                        />
                                    }
                                    sx={{ marginBottom: 2, backgroundColor: 'white', color: '#263238',
                                        '&:hover': {
                                            backgroundColor: '#b4dcee',
                                        }}}
                                    onClick={loginGoogle}
                                >
                                    LOGAR com o Google
                                </Button>
                        </Box>
                    </Grid>
                    <Grid item xs={6} style={{
                        background: 'white',
                        padding: '20px',
                        borderBottomRightRadius: '20px',
                        borderTopRightRadius: '20px',
                        boxShadow: '0px 0px 10px rgba(0.3, 0.3, 0.3, 0.3)'
                    }}>
                        <img
                            src={process.env.PUBLIC_URL + '/assets/img-login.png'}
                            alt="img"
                            style={{ width: '100%', height: 'auto', alignItems: 'center' }}
                        />
                    </Grid>
                </Grid>
                {/* Espaço para o rodapé */}
                <div className="footer"></div>
                {/* Rodapé */}
                <div className="footerStyle">
                    <Typography>
                        Desenvolvido por Clarisse Diniz e Douglas Almeida @ 2023
                    </Typography>
                </div>
            </div>
        );
    } else {
        return <Navigate to="/home" />;
    }

};

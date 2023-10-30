import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {DialogContent, Typography} from "@mui/material";


export default function EnviarArtigoDialog({ open, onClose, onEnviarArtigo, artigo }) {
    const [confirmarEnvio, setConfirmarEnvio] = useState(false);


    const handleSimClick = () => {
        setConfirmarEnvio(true);
        onEnviarArtigo();
    };

    const handleFechar = () => {
        setConfirmarEnvio(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleFechar}>
            <DialogTitle>Enviar Artigo</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Gostaria de enviar o artigo {artigo ? JSON.stringify(artigo.id)+ " - " + JSON.stringify(artigo.titulo) : ''} para edição?
                </Typography>
            </DialogContent>
            <DialogActions>
                {!confirmarEnvio ? (
                    <>
                        <Button color="primary" onClick={handleFechar}>
                            Não
                        </Button>
                        <Button color="secondary" onClick={handleSimClick}>
                            Sim
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleFechar}>
                        Fechar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

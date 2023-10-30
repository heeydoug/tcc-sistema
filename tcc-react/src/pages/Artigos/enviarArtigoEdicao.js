import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import { toast, ToastContainer } from "react-toastify";
import {DialogContent, Typography} from "@mui/material";

import {updateStatusArtigo} from "../../actions/artigos";

export default function EnviarArtigoDialog({ open, onClose, onEnviarArtigo, artigo, handleRefresh }) {
    const [confirmarEnvio, setConfirmarEnvio] = useState(false);



    const handleSimClick = async () => {
        try {
            const response = await updateStatusArtigo(artigo.id, "EM_EDICAO");
            setConfirmarEnvio(false);
            toast.success("Artigo enviado com sucesso:", response);
            onClose();
            handleRefresh();
        } catch (error) {
            setConfirmarEnvio(false);
            toast.error("Erro ao enviar o artigo:", error);
        }
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
                    Gostaria de enviar o artigo {artigo ? JSON.stringify(artigo.id) + " - " + JSON.stringify(artigo.titulo) : ''} para edição?
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

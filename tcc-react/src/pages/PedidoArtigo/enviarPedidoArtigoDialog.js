import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField, TextareaAutosize,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import Grid from "@mui/material/Grid";

export const EnviarPedidoArtigoDialog = ({
                                                  open,
                                                  onClose,
                                                  onAdicionarConteudo,
                                              }) => {
    const [conteudo, setConteudo] = useState("");
    const sessionUser = sessionStorage.getItem("@AuthFirebase:userSession");
    const sessionUserF = JSON.parse(sessionUser);

    const handleEnviarPedido = () => {
        if (conteudo.trim() === "") {
            toast.warning("O conteúdo não pode estar vazio.");
            return;
        }

        const pedidoDeArtigo = {
            conteudo: conteudo,
            clienteId: sessionUserF.id,
        };

        onAdicionarConteudo(pedidoDeArtigo);
        setConteudo("");
    };


    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title" fullWidth>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                pauseOnFocusLoss
                draggable
                hideProgressBar={false}
            />
            <DialogTitle id="form-dialog-title">Enviar Pedido de Artigo</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} sx={{ paddingTop: "3%" }}>
                        <TextField
                            label="Conteúdo"
                            fullWidth
                            multiline
                            rows={4}
                            value={conteudo}
                            onChange={(e) => setConteudo(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleEnviarPedido}
                        sx={{
                            color: "indianred"
                        }}>
                    Enviar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

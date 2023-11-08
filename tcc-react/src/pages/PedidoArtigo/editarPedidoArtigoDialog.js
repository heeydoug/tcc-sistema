import React, { useState, useEffect } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Button,
    TextField,
} from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import Grid from "@mui/material/Grid";

export const EditarPedidoArtigoDialog = ({
                                             open,
                                             pedido,
                                             onClose,
                                             onEditarPedido,
                                         }) => {
    const [novoConteudo, setNovoConteudo] = useState(""); // Inicializado como uma string vazia
    const [conteudo, setConteudo] = useState(""); // Inicializado como uma string vazia

    // Atualize o valor do estado "novoConteudo" ao receber um novo pedido
    useEffect(() => {
        if (pedido) {
            setConteudo(pedido.conteudo);
            setNovoConteudo(pedido.conteudo);
        }
    }, [pedido]);

    const handleEditarPedido = () => {
        if (novoConteudo.trim() === "") {
            toast.warning("O conteúdo não pode estar vazio.");
            return;
        }

        const pedidoEditado = {
            ...pedido,
            conteudo: novoConteudo,
        };

        // Chame a função para editar o pedido de artigo.
        onEditarPedido(pedidoEditado);
        onClose();
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
            <DialogTitle id="form-dialog-title">Editar Pedido de Artigo</DialogTitle>
            <DialogContent>
                <Grid container>
                    <Grid item xs={12} sx={{ paddingTop: "3%" }}>
                        <TextField
                            label="Conteúdo"
                            fullWidth
                            multiline
                            rows={4}
                            value={novoConteudo}
                            onChange={(e) => setNovoConteudo(e.target.value)}
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={handleEditarPedido} sx={{ color: "indianred" }}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

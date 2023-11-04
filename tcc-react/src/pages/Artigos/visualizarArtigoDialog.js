import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Button, DialogActions} from "@mui/material";

export default function VisualizarArtigoDialog({ open, onClose, artigo }) {

    function getEstadoAtualText(estadoAtual) {
        switch (estadoAtual) {
            case "ABERTO":
                return "Aberto";
            case "EM_REVISAO":
                return "Em Revisão";
            case "EM_EDICAO":
                return "Em Edição";
            case "REVISADO":
                return "Revisado";
            case "ACEITO":
                return "Aceito";
            case "CANCELADO":
                return "Cancelado";
            default:
                return estadoAtual;
        }
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Detalhes do Artigo</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{paddingTop: '2%'}}>
                    <Grid item xs={12}>
                        <TextField
                            label="ID"
                            value={artigo ? JSON.stringify(artigo.id) : ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Título"
                            value={artigo ? JSON.stringify(artigo.titulo).replace(/"/g, '') : ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Conteúdo"
                            value={artigo ? JSON.stringify(artigo.conteudo).replace(/"/g, '') : ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Palavra-Chave"
                            value={artigo ? JSON.stringify(artigo.palavraChave).replace(/"/g, '') : ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Redator"
                            value={artigo ? JSON.stringify(artigo.redator.nome).replace(/"/g, '') : ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Revisor"
                            value={artigo ? JSON.stringify(artigo.revisor.nome).replace(/"/g, '') : ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Cliente"
                            value={artigo ? JSON.stringify(artigo.cliente.nome).replace(/"/g, '') : ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Estado Atual"
                            value={artigo ? getEstadoAtualText(artigo.estadoAtual) : ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Data de Criação"
                            value={artigo ? JSON.stringify(artigo.dataCriacao).replace(/"/g, '') : ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <TextField
                            label="Data de Finalização"
                            value={artigo ? (artigo.dataFinalizacao !== null ? JSON.stringify(artigo.dataFinalizacao).replace(/"/g, '') : '') : ''}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose}>
                    Cancelar
                </Button>
            </DialogActions>
        </Dialog>
    );
}

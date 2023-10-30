import React from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import {Button, DialogActions} from "@mui/material";

export default function VisualizarArtigoDialog({ open, onClose, artigo }) {
    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle>Detalhes do Artigo</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{paddingTop: '2%'}}>
                    <Grid item xs={12}>
                        <TextField
                            label="ID"
                            value={artigo.id}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Título"
                            value={artigo.titulo}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Conteúdo"
                            value={artigo.conteudo}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Palavra-Chave"
                            value={artigo.palavraChave}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Redator"
                            value={artigo.redator}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Revisor"
                            value={artigo.revisor}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Cliente"
                            value={artigo.cliente}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Estado Atual"
                            value={artigo.estadoAtual}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Data de Criação"
                            value={artigo.dataCriacao}
                            InputProps={{ readOnly: true }}
                            fullWidth
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Data de Finalização"
                            value={artigo.dataFinalizacao}
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

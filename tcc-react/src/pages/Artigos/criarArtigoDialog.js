import React, { useState } from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    TextField,
    Select,
    Button, Autocomplete,
} from "@mui/material";
import Grid from "@mui/material/Grid";

export const CriarArtigoDialog = ({
                                      open,
                                      onClose,
                                      redatores,
                                      revisores,
                                      clientes,
                                      criarArtigo,
                                      novoArtigo,
                                      setNovoArtigo,
                                      selectedRedator,
                                      setSelectedRedator,
                                      selectedRevisor,
                                      setSelectedRevisor,
                                      selectedCliente,
                                      setSelectedCliente,
                                  }) => {

    setSelectedRedator(null);
    setSelectedRevisor(null);
    setSelectedCliente(null);
    // Função para redefinir os valores dos campos para nulo
    const resetDialogFields = () => {
        setNovoArtigo({
            titulo: "",
            conteudo: "",
            palavraChave: "",
        });
        setSelectedRedator(null);
        setSelectedRevisor(null);
        setSelectedCliente(null);
    };

    return (
        <Dialog open={open} onClose={() => { onClose(); resetDialogFields(); }} aria-labelledby="form-dialog-title">
            <DialogTitle id="form-dialog-title">Criar Artigo</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ paddingTop: "2%" }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Título"
                            fullWidth
                            value={novoArtigo.titulo}
                            onChange={(e) =>
                                setNovoArtigo({ ...novoArtigo, titulo: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Conteúdo"
                            fullWidth
                            value={novoArtigo.conteudo}
                            onChange={(e) =>
                                setNovoArtigo({ ...novoArtigo, conteudo: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Palavra-Chave"
                            fullWidth
                            value={novoArtigo.palavraChave}
                            onChange={(e) =>
                                setNovoArtigo({
                                    ...novoArtigo,
                                    palavraChave: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            options={redatores}
                            getOptionLabel={(option) => option.nome}
                            value={selectedRedator}
                            onChange={(e, newValue) => setSelectedRedator(newValue)}
                            renderInput={(params) => <TextField {...params} label="Redator" fullWidth />}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Autocomplete
                            options={revisores}
                            getOptionLabel={(option) => option.nome}
                            value={selectedRevisor}
                            onChange={(e, newValue) => setSelectedRevisor(newValue)}
                            renderInput={(params) => <TextField {...params} label="Revisor" fullWidth />}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Autocomplete
                            options={clientes}
                            getOptionLabel={(option) => option.nome}
                            value={selectedCliente}
                            onChange={(e, newValue) => setSelectedCliente(newValue)}
                            renderInput={(params) => <TextField {...params} label="Cliente" fullWidth />}
                        />
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { onClose(); resetDialogFields(); }} color="primary">
                    Cancelar
                </Button>
                <Button onClick={criarArtigo} color="secondary">
                    Criar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

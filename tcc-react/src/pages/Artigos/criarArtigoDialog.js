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
    Button,
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
    return (
        <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
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
                        <FormControl fullWidth>
                            <InputLabel>Redator</InputLabel>
                            <Select
                                value={selectedRedator}
                                onChange={(e) => setSelectedRedator(e.target.value)}
                            >
                                {redatores.map((redator) => (
                                    <MenuItem key={redator.id} value={redator.id}>
                                        {redator.nome}
                                    </MenuItem>
                                ))}
                            </Select>

                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Revisor</InputLabel>
                            <Select
                                value={selectedRevisor}
                                onChange={(e) => setSelectedRevisor(e.target.value)}
                            >
                                {revisores.map((revisor) => (
                                    <MenuItem key={revisor.id} value={revisor.id}>
                                        {revisor.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel>Cliente</InputLabel>
                            <Select
                                value={selectedCliente}
                                onChange={(e) => setSelectedCliente(e.target.value)}
                            >
                                {clientes.map((cliente) => (
                                    <MenuItem key={cliente.id} value={cliente.id}>
                                        {cliente.nome}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    Cancelar
                </Button>
                <Button onClick={criarArtigo} color="secondary">
                    Criar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

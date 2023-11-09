import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";

import Select from '@mui/material/Select';
import Grid from "@mui/material/Grid";

const EditarRedator = ({ open, onClose, usuario, onSave }) => {
    const [nome, setNome] = useState(usuario ? usuario.nome : "");
    const [tipo, setTipo] = useState(usuario ? usuario.tipo : "");

    useEffect(() => {
        setNome(usuario ? usuario.nome : "");
        setTipo(usuario ? usuario.tipo : "");
    }, [usuario]);

    const handleSave = () => {
        onSave({
            id: usuario.id,
            nome,
            tipo,
        });
        onClose();
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Editar Redator</DialogTitle>
            <DialogContent >
                <Grid container spacing={2} sx={{paddingTop: '2%'}}>
                    <Grid item xs={12} >
                        <TextField
                            id="outlined-basic"
                            variant="outlined"
                            label="Nome"
                            fullWidth
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl fullWidth>
                            <InputLabel id="selectTipo">Tipo do Usuário</InputLabel>
                            <Select
                                value={tipo}
                                onChange={(e) => setTipo(e.target.value)}
                                labelId="selectTipo"
                                id="selectTipo"
                                label="Tipo do Usuário"
                            >
                                <MenuItem value="CLIENTE">Cliente</MenuItem>
                                <MenuItem value="REDATOR">Redator</MenuItem>
                                <MenuItem value="REVISOR">Revisor</MenuItem>
                                <MenuItem value="USUARIO">Usuário</MenuItem>
                            </Select>
                        </FormControl>
                    </Grid>
                </Grid>
            </DialogContent>
            <DialogActions>
                <Button sx={{
                    color: "indianred"
                }} onClick={onClose}>
                    Cancelar
                </Button>
                <Button color="primary" onClick={handleSave}>
                    Salvar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditarRedator;

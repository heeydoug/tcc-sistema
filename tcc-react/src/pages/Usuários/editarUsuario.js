import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
} from "@mui/material";
import {deleteUser, getUsers} from "../../actions/usuarios";
import {toast} from "react-toastify";

const EditarUsuario = ({ open, onClose, usuario, onSave }) => {
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
        console.log(onSave)
        onClose();
    };


    const contentStyle = {
        display: "flex",
        flexDirection: "column",
        gap: "16px", // Espaçamento entre os elementos internos
    };

    return (
        <Dialog open={open} onClose={onClose} fullWidth>
            <DialogTitle>Editar Usuário</DialogTitle>
            <DialogContent style={contentStyle}>
                <TextField
                    label="Nome"
                    fullWidth
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                />
                <FormControl fullWidth>
                    <InputLabel>Tipo do Usuário</InputLabel>
                    <Select
                        value={tipo}
                        onChange={(e) => setTipo(e.target.value)}
                    >
                        <MenuItem value="REVISOR">Cliente</MenuItem>
                        <MenuItem value="REDATOR">Redator</MenuItem>
                        <MenuItem value="CLIENTE">Revisor</MenuItem>
                        <MenuItem value="USUARIO">Usuário</MenuItem>
                    </Select>
                </FormControl>
            </DialogContent>
            <DialogActions>
                <Button color="primary" onClick={onClose}>Cancelar</Button>
                <Button color="secondary" onClick={handleSave}>Salvar</Button>
            </DialogActions>
        </Dialog>
    );
};

export default EditarUsuario;

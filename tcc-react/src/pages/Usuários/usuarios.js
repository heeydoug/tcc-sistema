import { useContext, useEffect, useState } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { Navigate } from "react-router-dom";
import Sidenav from "../../components/sidenav";
import { Button, Container, createTheme, ThemeProvider, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from "@mui/material";
import Box from "@mui/material/Box";
import * as React from "react";
import '@fontsource/roboto';
import '@fontsource/roboto/300.css';
import { DataGrid, ptBR } from '@mui/x-data-grid';
import {getUsers, deleteUser, updateUser} from "../../actions/usuarios"; // Certifique-se de ter uma função `deleteUser` que exclui o usuário
import Avatar from "@mui/material/Avatar";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Paper } from "@mui/material";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import EditarUsuario from "../Usuários/editarUsuario";


import "./usuarios.css";

export const Usuarios = () => {
    const theme = createTheme(
        {
            palette: {
                primary: {
                    main: "#1976D2",
                },
            },
        },
        ptBR
    );

    const [usuarios, setUsuarios] = useState([]); // Estado para armazenar os dados dos usuários

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);


    useEffect(() => {
        getUsers()
            .then(data => setUsuarios(data))
            .catch(error => console.error('Erro ao buscar dados de usuários:', error));
    }, []);

    // Colunas da tabela
    const columns = [
        { field: 'id', headerName: 'ID', width: 100, headerClassName: 'center-aligned', cellClassName: 'center-aligned' },
        {
            field: 'urlFoto',
            headerName: 'Foto',
            width: 100,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Avatar alt="Foto do Usuário" src={params.value} />
                </div>
            ),
        },
        { field: 'nome', headerName: 'Nome', width: 200, headerClassName: 'center-aligned', cellClassName: 'center-aligned' },
        { field: 'email', headerName: 'Email', width: 200, headerClassName: 'center-aligned', cellClassName: 'center-aligned' },
        { field: 'tipo', headerName: 'Tipo do Usuário', width: 150, headerClassName: 'center-aligned', cellClassName: 'center-aligned' },
        { field: 'dataCriacao', headerName: 'Data de Criação', width: 150, headerClassName: 'center-aligned', cellClassName: 'center-aligned' },
        {
            field: 'ativo',
            headerName: 'Status',
            width: 100,
            headerClassName: 'center-aligned',
            cellClassName: 'center-aligned',
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    {params.value ? (
                        <Paper key={`ativo-${params.row.id}`} variant="outlined"
                               sx={{ background: '#1976D2', color: 'white', padding: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            Ativo
                        </Paper>
                    ) : (
                        <Paper key={`cancelado-${params.row.id}`} variant="outlined"
                               sx={{ background: '#9C27B0', color: 'white', padding: '3px', display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
                            Cancelado
                        </Paper>
                    )}
                </div>
            ),
        },

        {
            field: 'acoes',
            headerName: 'Ações',
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button color="primary" onClick={() => handleEdit(params.row.id)}>
                        <EditIcon />
                    </Button>

                    <Button color="secondary" onClick={() => handleDialogOpen(params.row.id)}>
                        <DeleteIcon />
                    </Button>
                </div>
            ),
        },

    ];

    // Função para excluir o usuário
    const [dialogOpen, setDialogOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const handleDialogOpen = (id) => {
        setUserIdToDelete(id);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setUserIdToDelete(null);
        setDialogOpen(false);
    };

    const handleExcluir = () => {
        if (userIdToDelete) {
            // Chame a função deleteUser para excluir o usuário
            deleteUser(userIdToDelete)
                .then(() => {
                    // Atualize a lista de usuários após a exclusão
                    getUsers()
                        .then(data => {
                            setUsuarios(data)
                            toast.success('Usuário excluído com sucesso!');
                        })
                        .catch(error => console.error('Erro ao buscar dados de usuários:', error));

                    handleDialogClose();
                })
                .catch(error => {
                    console.error('Erro ao excluir usuário:', error)
                    toast.error('Erro ao excluir usuário.');
                });
        }
    };

    const handleEdit = (id) => {
        setEditingUserId(id);
        setEditDialogOpen(true);
    };

    const handleCloseEditDialog = () => {
        setEditingUserId(null);
        setEditDialogOpen(false);
    };

    const handleUpdate = () => {
        if (userIdToDelete) {
            // Chame a função deleteUser para excluir o usuário
            deleteUser(userIdToDelete)
                .then(() => {
                    // Atualize a lista de usuários após a exclusão
                    getUsers()
                        .then(data => {
                            setUsuarios(data)
                            toast.success('Usuário excluído com sucesso!');
                        })
                        .catch(error => console.error('Erro ao buscar dados de usuários:', error));

                    handleDialogClose();
                })
                .catch(error => {
                    console.error('Erro ao excluir usuário:', error)
                    toast.error('Erro ao excluir usuário.');
                });
        }
    };
    const handleSaveUser = (updatedUser) => {
        if(updatedUser) {
            updateUser(updatedUser)
                .then(() => {
                    console.log("Usuário atualizado:", updatedUser);
                    getUsers()
                        .then((data) => {
                            setUsuarios(data);
                            toast.success("Usuário atualizado com sucesso!");
                        })
                        .catch((error) => {
                            console.error("Erro ao buscar dados de usuários:", error);
                            toast.error("Erro ao atualizar usuário.");
                        });
                    handleCloseEditDialog();
                })
        }
    }

    return (
        <ThemeProvider theme={theme}>
            <Container maxWidth="lg">
                <ToastContainer position="top-right" autoClose={3000} pauseOnFocusLoss draggable hideProgressBar={false} />
                <Box height={30} />
                <Box
                    sx={{
                        height: 400,
                        width: '100%',
                    }}
                >
                    <Typography
                        variant="h3"
                        component="h1"
                        fontWeight="bold"
                        sx={{ textAlign: 'center', mt: 3, mb: 3 }}
                    >
                        Gerenciar Usuários
                    </Typography>
                    <div style={{ height: 500, width: '100%' }}>
                        <DataGrid
                            rows={usuarios}
                            columns={columns}
                            pageSize={10}
                        />
                    </div>
                </Box>
            </Container>

            {/* Botão de Exclusão */}
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirmar Exclusão"}</DialogTitle>
                <DialogContent>
                    <Typography variant="body1">
                        Tem certeza de que deseja excluir este usuário?
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose} color="primary">
                        Cancelar
                    </Button>
                    <Button onClick={handleExcluir} color="secondary">
                        Excluir
                    </Button>
                </DialogActions>
            </Dialog>

            <EditarUsuario
                open={editDialogOpen}
                onClose={handleCloseEditDialog}
                onSave={handleSaveUser}
                usuario={usuarios.find((user) => user.id === editingUserId)}
            />


        </ThemeProvider>
    );
}

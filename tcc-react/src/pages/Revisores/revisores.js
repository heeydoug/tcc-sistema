import Box from "@mui/material/Box";
import * as React from "react";
import {
    Button,
    Container, createTheme,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle, Paper,
    ThemeProvider,
    Typography
} from "@mui/material";
import {toast, ToastContainer} from "react-toastify";
import RefreshIcon from "@mui/icons-material/Refresh";
import {DataGrid, ptBR} from "@mui/x-data-grid";
import {useEffect, useState} from "react";
import {deleteUser, getReviewer, getUsers, updateUser} from "../../actions/usuarios";
import Avatar from "@mui/material/Avatar";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import EditarRevisor from "./editarRevisor";
import {useAppStore} from "../../configs/appStore";

export const Revisores = () => {

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

    const [revisores, setRevisores] = useState([]);

    const [editDialogOpen, setEditDialogOpen] = useState(false);
    const [editingUserId, setEditingUserId] = useState(null);

    useEffect(() => {
        getReviewer()
            .then(data => setRevisores(data))
            .catch(error => console.error('Erro ao buscar dados de revisores:', error));
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

                    <Button sx={{
                        color: "indianred"
                    }} onClick={() => handleDialogOpen(params.row.id)}>
                        <DeleteIcon />
                    </Button>
                </div>
            ),
        },
    ];

    // Função para excluir o revisor
    const [dialogOpen, setDialogOpen] = useState(false);
    const [userIdToDelete, setUserIdToDelete] = useState(null);

    const dopen = useAppStore((state) => state.dopen);
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
            deleteUser(userIdToDelete)
                .then(() => {
                    getReviewer()
                        .then(data => {
                            setRevisores(data)
                            toast.success('Revisor excluído com sucesso!');
                        })
                        .catch(error => console.error('Erro ao buscar dados de revisores:', error));

                    handleDialogClose();
                })
                .catch(error => {
                    console.error('Erro ao excluir revisor:', error)
                    toast.error('Erro ao excluir revisor.');
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

    const handleSaveUser = (updatedUser) => {
        if(updatedUser) {
            updateUser(updatedUser)
                .then(() => {
                    console.log("Revisor atualizado:", updatedUser);
                    getReviewer()
                        .then((data) => {
                            setRevisores(data);
                            toast.success("Revisor atualizado com sucesso!");
                        })
                        .catch((error) => {
                            console.error("Erro ao buscar dados de revisores:", error);
                            toast.error("Erro ao atualizar revisor.");
                        });
                    handleCloseEditDialog();
                })
        }
    }

    const handleRefresh = () => {
        getReviewer()
            .then(data => {
                setRevisores(data)
                toast.success("Revisores atualizados com sucesso!");
            })
            .catch(error => console.error('Erro ao buscar dados de revisores:', error));
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={`container ${dopen ? 'open' : ''}`}>
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
                            Gerenciar Revisores
                        </Typography>
                        {/* Botão de Atualização */}
                        <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                            <Button variant="contained" color="primary" onClick={handleRefresh}>
                                <RefreshIcon />
                            </Button>
                        </div>
                        <div style={{ height: 500, width: '100%' }}>
                            <DataGrid
                                rows={revisores}
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
                        <Button onClick={handleDialogClose} sx={{
                            color: "indianred"
                        }}>
                            Cancelar
                        </Button>
                        <Button onClick={handleExcluir} color="primary">
                            Excluir
                        </Button>
                    </DialogActions>
                </Dialog>

                <EditarRevisor
                    open={editDialogOpen}
                    onClose={handleCloseEditDialog}
                    onSave={handleSaveUser}
                    usuario={revisores.find((user) => user.id === editingUserId)}
                />
            </div>

        </ThemeProvider>
    )
}
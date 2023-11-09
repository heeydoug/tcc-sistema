import {Button, createTheme, Dialog, DialogActions, DialogContent, DialogTitle, ThemeProvider} from "@mui/material";
import {DataGrid, ptBR} from "@mui/x-data-grid";
import {useAppStore} from "../../configs/appStore";
import Container from "@mui/material/Container";
import {toast, ToastContainer} from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, {useEffect, useState} from "react";
import {EnviarPedidoArtigoDialog} from "./enviarPedidoArtigoDialog";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import {deleteUser, getUsers} from "../../actions/usuarios";
import {EditarPedidoArtigoDialog} from "./editarPedidoArtigoDialog";

export const PedidosArtigo = () => {
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

    useEffect(() => {
        fetchPedidosArtigos();
    }, []);

    const dopen = useAppStore((state) => state.dopen);
    const [data, setData] = useState([]);
    const [openAdicionarConteudoDialog, setOpenAdicionarConteudoDialog] = useState(false);
    const [conteudoPedido, setConteudoPedido] = useState(""); // Para armazenar o conteúdo que será adicionado ao pedido de artigo
    const [dialogOpen, setDialogOpen] = useState(false);
    const [pedidoIdToDelete, setPedidoIdToDelete] = useState(null);
    const [pedidoParaEditar, setPedidoParaEditar] = useState(null);


    const fetchPedidosArtigos = async () => {
        try {
            const response = await fetch("http://localhost:8080/pedidos");
            if (response.ok) {
                const data = await response.json();
                setData(data);
            } else {
                toast.error("Falha ao buscar dados dos pedidos de artigos.");
            }
        } catch (error) {
            toast.error("Erro ao buscar dados dos pedidos de artigos:", error);
        }
    };

    const fetchPedidosArtigosHandle = async () => {
        try {
            const response = await fetch("http://localhost:8080/pedidos");
            if (response.ok) {
                const data = await response.json();
                setData(data);
                toast.success("Pedidos de artigos atualizado com sucesso!");
            } else {
                toast.error("Falha ao buscar dados dos pedidos de artigos.");
            }
        } catch (error) {
            toast.error("Erro ao buscar dados dos pedidos de artigos:", error);
        }
    };

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "conteudo", headerName: "Conteúdo", flex: 3 },
        { field: "dataCriacao", headerName: "Data de Criação", flex: 2 },
        {
            field: 'acoes',
            headerName: 'Ações',
            width: 150,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button color="primary" onClick={() => handleEditarPedido(params.row)}>
                        <EditIcon />
                    </Button>
                    <Button
                        onClick={() => handleDialogOpen(params.row.id)}
                        sx={{
                            color: "indianred"
                        }}
                    >
                        <DeleteIcon />
                    </Button>
                </div>
            ),
        }
    ];


    const fecharAdicionarConteudoDialog = () => {
        setOpenAdicionarConteudoDialog(false);
    };

    const adicionarConteudoAoPedido = (dadosDoPedido) => {
        fetch("http://localhost:8080/pedidos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(dadosDoPedido),
        })
            .then((response) => {
                if (response.ok) {
                    toast.success("Pedido de artigo enviado com sucesso!");
                    fetchPedidosArtigos();
                } else {
                    toast.error("Erro ao enviar pedido de artigo.");
                }
            })
            .catch((error) => {
                toast.error("Erro na solicitação:", error);
            })
            .finally(() => {
                fecharAdicionarConteudoDialog();
            });
    };

    const handleEditarPedido = (pedido) => {
        if (pedido) {
            setPedidoParaEditar(pedido);

            fetch(`http://localhost:8080/pedidos/${pedido.id}`, {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(pedido),
            })
                .then((response) => {
                    if (response.ok) {
                        toast.success("Pedido de artigo editado com sucesso!");
                        fetchPedidosArtigos();
                    } else {
                        toast.error("Erro ao editar o pedido de artigo.");
                    }
                })
                .catch((error) => {
                    toast.error("Erro na solicitação:", error);
                })


        }
    };

    const handleDialogOpen = (id) => {
        setPedidoIdToDelete(id);
        setDialogOpen(true);
    };

    const handleDialogClose = () => {
        setPedidoIdToDelete(null);
        setDialogOpen(false);
    };

    const handleExcluir = () => {
        if (pedidoIdToDelete) {
            fetch(`http://localhost:8080/pedidos/${pedidoIdToDelete}`, {
                method: "DELETE",
            })
                .then((response) => {
                    if (response.ok) {
                        toast.success('Pedido de artigo excluído com sucesso!');
                        fetchPedidosArtigos();
                        handleDialogClose();
                    } else {
                        toast.error("Erro ao excluir o pedido de artigo.");
                    }
                })
                .catch((error) => {
                    toast.error("Erro na solicitação:", error);
                });
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <div className={`container ${dopen ? "open" : ""}`}>
                <Container maxWidth="xl">
                    <ToastContainer
                        position="top-right"
                        autoClose={3000}
                        pauseOnFocusLoss
                        draggable
                        hideProgressBar={false}
                    />
                    <Box height={30} />
                    <Box
                        sx={{
                            height: 400,
                            width: "100%",
                        }}
                    >
                        <Typography
                            variant="h3"
                            component="h1"
                            fontWeight="bold"
                            sx={{ textAlign: "center", mt: 3, mb: 3 }}
                        >
                            Pedidos de Artigos
                        </Typography>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={() => setOpenAdicionarConteudoDialog(true)}
                                >
                                    Enviar Pedido de Artigo
                                </Button>
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={fetchPedidosArtigosHandle}
                                >
                                    <RefreshIcon />
                                </Button>
                            </div>
                        </div>
                        <div style={{ marginBottom: "10px", textAlign: "right", height: "600px" }}>
                            <DataGrid
                                rows={data}
                                columns={columns}
                                pagination
                                paginationPageSize={10}
                                rowsPerPageOptions={[10, 20, 50]}
                                disableRowSelectionOnClick
                            />
                        </div>

                        <EnviarPedidoArtigoDialog
                            open={openAdicionarConteudoDialog}
                            onClose={fecharAdicionarConteudoDialog}
                            onAdicionarConteudo={adicionarConteudoAoPedido}
                        />

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
                                    Tem certeza de que deseja excluir este pedido?
                                </Typography>
                            </DialogContent>
                            <DialogActions>
                                <Button onClick={handleDialogClose} color="primary">
                                    Cancelar
                                </Button>
                                <Button onClick={handleExcluir} sx={{
                                    color: "indianred"
                                }}>
                                    Excluir
                                </Button>
                            </DialogActions>
                        </Dialog>

                        <EditarPedidoArtigoDialog
                            open={pedidoParaEditar !== null}
                            pedido={pedidoParaEditar}
                            onClose={() => setPedidoParaEditar(null)}
                            onEditarPedido={handleEditarPedido}
                        />

                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    );
}
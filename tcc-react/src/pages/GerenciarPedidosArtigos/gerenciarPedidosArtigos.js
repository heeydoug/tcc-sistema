import {
    Button,
    createTheme,
    ThemeProvider,
    Tooltip
} from "@mui/material";
import {DataGrid, ptBR} from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import {toast, ToastContainer} from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, {useEffect, useState} from "react";
import {useAppStore} from "../../configs/appStore";
import AddBoxIcon from '@mui/icons-material/AddBox';
export const GerenciarPedidosArtigos = () => {
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

    const columns = [
        { field: "id", headerName: "ID", flex: 1 },
        { field: "conteudo", headerName: "Conteúdo", flex: 3 },
        { field: "dataCriacao", headerName: "Data de Criação", flex: 2 },
        {
            field: 'acoes',
            headerName: 'Ações',
            headerAlign: 'center',
            flex: 2,
            align: 'center',
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="Criar Artigo" arrow placement="left-start">
                        <span>
                            <Button
                            >
                                <AddBoxIcon />
                            </Button>
                        </span>
                    </Tooltip>
                </div>
            ),
        }
    ];

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

    const dopen = useAppStore((state) => state.dopen);
    const [data, setData] = useState([]);

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
                            Gerenciar Pedidos de Artigos
                        </Typography>

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                            <div style={{ marginLeft: 'auto' }}>
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

                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    );
}
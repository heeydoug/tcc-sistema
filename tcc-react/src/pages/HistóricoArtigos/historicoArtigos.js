import React, { useState, useEffect } from "react";
import {
    Button,
    createTheme,
    ThemeProvider,
} from "@mui/material";
import { DataGrid, ptBR } from "@mui/x-data-grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import { toast, ToastContainer } from "react-toastify";
import { useAppStore } from "../../configs/appStore";
import { listArticlesHistoric } from "../../actions/artigos";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisualizarArtigoDialog from "../Artigos/visualizarArtigoDialog";



export const HistoricoArtigos = () => {
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

    const dopen = useAppStore((state) => state.dopen);
    const [data, setData] = useState([]);
    const [selectedArtigoVisualizar, setSelectedArtigoVisulizar] = useState(null);
    const [openVisualizarArtigoDialog, setOpenVisualizarArtigoDialog] = useState(false);
    const handleVisualizarArtigo = (params) => {
        setSelectedArtigoVisulizar(params);
        setOpenVisualizarArtigoDialog(true);
    };

    const handleAbrirArtigoDocs = (params) => {
        window.open("https://docs.google.com/document/d/" + params.idDocumentoDrive + "/edit", "_blank");
    };

    const columns = [
        {
            field: "actions",
            headerName: "Ações",
            headerClassName: "header-center",
            width: 130,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Button
                        color="primary"
                        onClick={() => { handleAbrirArtigoDocs(params.row) }}
                        sx={{
                            fontSize: '1.7rem',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            marginRight: '10px',
                            margin: '-5px',
                            padding: '-20px',
                            '&:hover': {
                                backgroundColor: 'lightblue',
                                padding: '1px',
                                borderRadius: '10%',
                            },
                        }}
                        disabled={params.row.estadoAtual === "ABERTO"}
                    >
                        <FileOpenIcon />
                    </Button>
                    <Button
                        color="primary"
                        onClick={() => { handleVisualizarArtigo(params.row) }}
                        sx={{
                            fontSize: '1.7rem',
                            cursor: 'pointer',
                            marginLeft: '10px',
                            marginRight: '10px',
                            margin: '-5px',
                            padding: '-20px',
                            '&:hover': {
                                backgroundColor: 'lightblue',
                                padding: '1px',
                                borderRadius: '10%',
                            },
                        }}
                    >
                        <VisibilityIcon />
                    </Button>
                </div>
            ),
        },
        { field: "id", headerName: "ID", width: 60 },
        { field: "titulo", headerName: "Título", width: 200 },
        //{ field: "conteudo", headerName: "Conteúdo", flex: 1 },
        { field: "palavraChave", headerName: "Palavra-chave", width: 140 },
        { field: "redator", headerName: "Redator", width: 200,  valueGetter: (params) => params.row.redator.nome, },
        { field: "revisor", headerName: "Revisor", width: 200,  valueGetter: (params) => params.row.revisor.nome,},
        { field: "cliente", headerName: "Cliente", width: 200,  valueGetter: (params) => params.row.cliente.nome, },
        { field: "estadoAtual",
            headerName: "Estado Atual",
            width: 110,
            cellClassName: (params) => getEstadoAtualCellStyle(params.value),
            valueGetter: (params) => getEstadoAtualText(params.value),
        },
        { field: "dataCriacao", headerName: "Data de Criação", width: 100 },
        { field: "dataFinalizacao", headerName: "Data de Finalização", width: 100 },
        {
            field: "historicoEstados",
            headerName: "Histórico de Estados",
            width: 200,
            valueGetter: (params) => {
                const historicoEstados = params.row.historicoEstados;
                return historicoEstados
                    .map((estado) => getEstadoAtualText(estado.estado))
                    .join(", ");
            },
        },

    ];

    function getEstadoAtualText(estadoAtual) {
        switch (estadoAtual) {
            case "ABERTO":
                return "ABERTO";
            case "EM_EDICAO":
                return "EM EDIÇÃO";
            case "EM_REVISAO":
                return "EM REVISÃO";
            case "REVISADO":
                return "REVISADO";
            case "ACEITO":
                return "ACEITO";
            case "CANCELADO":
                return "CANCELADO";
            default:
                return estadoAtual;
        }
    }

    function getEstadoAtualCellStyle(estadoAtual) {
        switch (estadoAtual) {
            case "ABERTO":
                return "aberto-cell";
            case "EM EDIÇÃO":
                return "em-edicao-cell";
            case "EM REVISÃO":
                return "em-revisao-cell";
            case "REVISADO":
                return "revisado-cell";
            case "ACEITO":
                return "aceito-cell";
            case "CANCELADO":
                return "cancelado-cell";
            default:
                return "";
        }
    }

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const sessionUser = sessionStorage.getItem("@AuthFirebase:userSession");
            const sessionUserF = JSON.parse(sessionUser);
            if (sessionUserF) {
                const response = await listArticlesHistoric(
                    sessionUserF.email,
                    sessionUserF.tipo
                );
                setData(response);
            }
        } catch (error) {
            toast.error("Error fetching data:", error);
        }
    };



    const handleRefresh = () => {
        fetchData();
        toast.success("Histórico de Artigos atualizados com sucesso!");
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
                            Histórico de Artigos
                        </Typography>

                        <div style={{ marginBottom: "10px", textAlign: "right" }}>
                            <Button variant="contained" color="primary" onClick={handleRefresh}>
                                <RefreshIcon />
                            </Button>
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

                    <VisualizarArtigoDialog
                        open={openVisualizarArtigoDialog}
                        onClose={() => setOpenVisualizarArtigoDialog(false)}
                        artigo={selectedArtigoVisualizar}
                    />

                </Container>
            </div>
        </ThemeProvider>
    );
};

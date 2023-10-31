import {Button, createTheme, ThemeProvider} from "@mui/material";
import {DataGrid, ptBR} from "@mui/x-data-grid";
import {useAppStore} from "../../configs/appStore";
import Container from "@mui/material/Container";
import {toast, ToastContainer} from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, {useEffect, useState} from "react";
import {listArticles} from "../../actions/artigos";

export const MeusArtigos = () => {
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

    const columns = [
        { field: "id", headerName: "ID", width: 50 },
        { field: "titulo", headerName: "Título", flex: 1 },
        { field: "conteudo", headerName: "Conteúdo", flex: 1 },
        { field: "palavraChave", headerName: "Palavra-chave", flex: 1 },
        { field: "redator", headerName: "Redator", flex: 1,  valueGetter: (params) => params.row.redator.nome, },
        { field: "revisor", headerName: "Revisor", flex: 1,  valueGetter: (params) => params.row.revisor.nome,},
        { field: "cliente", headerName: "Cliente", flex: 1,  valueGetter: (params) => params.row.cliente.nome, },
        { field: "estadoAtual",
            headerName: "Estado Atual",
            width: 150,
            cellClassName: (params) => getEstadoAtualCellStyle(params.value),
            valueGetter: (params) => getEstadoAtualText(params.value),
        },
        { field: "dataCriacao", headerName: "Data de Criação", flex: 1 },
        { field: "dataFinalizacao", headerName: "Data de Finalização", flex: 1 },
        {
            field: "historicoEstados",
            headerName: "Histórico de Estados",
            flex: 2,
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
                if(sessionUserF.tipo === "REDATOR"){
                    const response = await listArticles(
                        sessionUserF.email,
                        sessionUserF.tipo,
                        "EM_EDICAO"
                    );
                    setData(response);
                }
                if(sessionUserF.tipo === "REVISOR"){
                    const response = await listArticles(
                        sessionUserF.email,
                        sessionUserF.tipo,
                        "EM_REVISAO"
                    );
                    setData(response);
                }
                if(sessionUserF.tipo === "CLIENTE"){
                    const response = await listArticles(
                        sessionUserF.email,
                        sessionUserF.tipo,
                        "REVISADO"
                    );
                    setData(response);
                }
            }
        } catch (error) {
            toast.error("Error fetching data:", error);
        }
    };

    const handleRefresh = () => {
        fetchData();
        toast.success("Meus Artigos atualizados com sucesso!");
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
                            Meus Artigos
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
                </Container>
            </div>
        </ThemeProvider>
    );

}
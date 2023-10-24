import React, {useEffect, useState} from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import {toast, ToastContainer} from "react-toastify";
import {Button, createTheme, ThemeProvider,} from "@mui/material";
import {DataGrid} from "@mui/x-data-grid";
import {useAppStore} from "../../configs/appStore";
import Typography from "@mui/material/Typography";
import {CriarArtigoDialog} from "./criarArtigoDialog";

export const Artigos = () => {
    const theme = createTheme({
        palette: {
            primary: {
                main: "#1976D2",
            },
        },
    });

    const openDialogCriarArtigo = () => {
        setOpenDialog(true);
    };

    const closeDialogCriarArtigo = () => {
        setOpenDialog(false);
    };

    const dopen = useAppStore((state) => state.dopen);
    const [artigos, setArtigos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    const [selectedRedator, setSelectedRedator] = useState("");
    const [selectedRevisor, setSelectedRevisor] = useState("");
    const [selectedCliente, setSelectedCliente] = useState("");

    const [clientes, setClientes] = useState([]);
    const [redatores, setRedatores] = useState([]);
    const [revisores, setRevisores] = useState([]);

    const [novoArtigo, setNovoArtigo] = useState({
        titulo: "",
        conteudo: "",
        palavraChave: "",
        // Outros campos do artigo
    });

    const criarArtigo = () => {
        // Envie os dados do novo artigo para o servidor
        // Atualize a lista de artigos
        closeDialogCriarArtigo();
    };

    const columns = [
        { field: "id", headerName: "ID", width: 100 },
        { field: "titulo", headerName: "Título", width: 200 },
        { field: "conteudo", headerName: "Conteúdo", width: 200 },
        { field: "palavraChave", headerName: "Palavra-Chave", width: 200 },
        { field: "redator", headerName: "Redator", width: 200 },
        { field: "revisor", headerName: "Revisor", width: 200 },
        { field: "cliente", headerName: "Cliente", width: 200 },
        { field: "estadoAtual", headerName: "Estado Atual", width: 150 },
        { field: "dataCriacao", headerName: "Data de Criação", width: 150 },
        { field: "dataFinalizacao", headerName: "Data de Finalização", width: 150 },
    ];


    useEffect(() => {
        async function fetchSelectData() {
            const clientesData = await fetchClientesData();
            const redatoresData = await fetchRedatoresData();
            const revisoresData = await fetchRevisoresData();

            setClientes(clientesData);
            setRedatores(redatoresData);
            setRevisores(revisoresData);
        }

        fetchSelectData();
    }, []);


    const fetchClientesData = async () => {
        const response = await fetch("http://localhost:8080/usuarios/tipoCliente");
        if (response.ok) {
            return await response.json();
        } else {
            toast.error(`Erro na resposta da API: ${response.status}`);
            return [];
        }
    };

    const fetchRedatoresData = async () => {
        const response = await fetch("http://localhost:8080/usuarios/tipoRedator");
        if (response.ok) {
            return await response.json();
        } else {
            toast.error("Erro ao buscar dados de redatores.");
            return [];
        }
    };

    const fetchRevisoresData = async () => {
        const response = await fetch("http://localhost:8080/usuarios/tipoRevisor");
        if (response.ok) {
            return await response.json();
        } else {
            toast.error("Erro ao buscar dados de revisores.");
            return [];
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <div className={`container ${dopen ? "open" : ""}`}>
                <Container maxWidth="lg">
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
                            Gerenciar Artigos
                        </Typography>
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={openDialogCriarArtigo}
                            style={{ marginBottom: "10px" }}
                        >
                            Criar Artigo
                        </Button>

                        <DataGrid rows={artigos} columns={columns} pageSize={10} />

                        <CriarArtigoDialog
                            open={openDialog}
                            onClose={closeDialogCriarArtigo}
                            redatores={redatores}
                            revisores={revisores}
                            clientes={clientes}
                            criarArtigo={criarArtigo}
                            novoArtigo={novoArtigo}
                            setNovoArtigo={setNovoArtigo}
                            selectedRedator={selectedRedator}
                            setSelectedRedator={setSelectedRedator}
                            selectedRevisor={selectedRevisor}
                            setSelectedRevisor={setSelectedRevisor}
                            selectedCliente={selectedCliente}
                            setSelectedCliente={setSelectedCliente}
                        />
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    );
};

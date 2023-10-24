import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { toast, ToastContainer } from "react-toastify";
import { Button, createTheme, ThemeProvider } from "@mui/material";
import {DataGrid, ptBR} from "@mui/x-data-grid";
import { useAppStore } from "../../configs/appStore";
import Typography from "@mui/material/Typography";
import { CriarArtigoDialog } from "./criarArtigoDialog";
import {getArticles} from "../../actions/artigos";
import RefreshIcon from "@mui/icons-material/Refresh";

export const Artigos = () => {
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

    const openDialogCriarArtigo = () => {
        setOpenDialog(true);
    };

    const closeDialogCriarArtigo = () => {
        setOpenDialog(false);
    };

    const dopen = useAppStore((state) => state.dopen);
    const [artigos, setArtigos] = useState([]);
    const [openDialog, setOpenDialog] = useState(false);

    // Função para buscar os artigos da API
    const fetchArtigosData = async () => {
        const response = await fetch("http://localhost:8080/artigos");
        if (response.ok) {
            return await response.json();
        } else {
            toast.error(`Erro na resposta da API: ${response.status}`);
            return [];
        }
    };
    const startGridArtigo = () => {
        getArticles()
            .then((data) => {
                setArtigos(data);
            })
            .catch((error) => console.error("Erro ao buscar dados de artigos:", error));
    };

    // Função para atualizar os artigos quando o botão "Atualizar" for clicado
    const handleRefresh = () => {
        getArticles()
            .then((data) => {
                setArtigos(data);
                toast.success("Artigos atualizados com sucesso!");
            })
            .catch((error) => console.error("Erro ao buscar dados de artigos:", error));
    };

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
        startGridArtigo();

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
                            Gerenciar Artigos
                        </Typography>

                        <div style={{ marginBottom: "10px", textAlign: "right"}}>
                            <Button variant="contained" color="primary" onClick={handleRefresh}>
                                <RefreshIcon />
                            </Button>
                        </div>
                        <div style={{ marginBottom: "10px", textAlign: "right", height: "600px" }}>
                            <DataGrid rows={artigos.map((artigo) => ({
                                ...artigo,
                                redator: artigo.redator.nome,
                                revisor: artigo.revisor.nome,
                                cliente: artigo.cliente.nome,
                            }))} columns={columns} pageSize={20} localeText={ptBR} />
                        </div>
                        <div style={{ marginTop: "10px"}}>
                            <Button
                                variant="contained"
                                color="primary"
                                onClick={openDialogCriarArtigo}
                            >
                                Criar Artigo
                            </Button>
                        </div>

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

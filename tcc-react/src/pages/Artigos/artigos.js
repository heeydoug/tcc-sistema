import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { toast, ToastContainer } from "react-toastify";
import {Button, createTheme, MenuItem, ThemeProvider, Tooltip} from "@mui/material";
import {DataGrid, ptBR} from "@mui/x-data-grid";
import { useAppStore } from "../../configs/appStore";
import Typography from "@mui/material/Typography";
import { CriarArtigoDialog } from "./criarArtigoDialog";
import {getArticles} from "../../actions/artigos";
import RefreshIcon from "@mui/icons-material/Refresh";
import EnviarArtigoDialog from "./MaisAções/enviarArtigoEdicaoDialog";
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisualizarArtigoDialog from "./visualizarArtigoDialog";
import FileOpenIcon from '@mui/icons-material/FileOpen';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import CancelIcon from '@mui/icons-material/Cancel';
import UndoIcon from '@mui/icons-material/Undo';
import DoneIcon from '@mui/icons-material/Done';

import "./artigos.css"
import Menu from "@mui/material/Menu";
import {alpha, styled} from "@mui/material/styles";
import EditIcon from "@mui/icons-material/Edit";
import CancelarArtigo from "./MaisAções/cancelarArtigoDialog";
import RetornarArtigoEdicaoDialog from "./MaisAções/retornarArtigoEdicaoDialog";
import CancelarArtigoDialog from "./MaisAções/cancelarArtigoDialog";
import RetornarArtigoRevisao from "./MaisAções/retornarArtigoRevisaoDIalog";
import ConcluirEtapaDialog from "./MaisAções/concluirEtapaDialog";

const StyledMenu = styled((props) => (
    <Menu
        elevation={0}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
        }}
        {...props}
    />
))(({ theme }) => ({
    '& .MuiPaper-root': {
        borderRadius: 6,
        marginTop: theme.spacing(1),
        minWidth: 180,
        color:
            theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
        boxShadow:
            'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
        '& .MuiMenu-list': {
            padding: '4px 0',
        },
        '& .MuiMenuItem-root': {
            '& .MuiSvgIcon-root': {
                fontSize: 18,
                color: theme.palette.text.secondary,
                marginRight: theme.spacing(1.5),
            },
            '&:active': {
                backgroundColor: alpha(
                    theme.palette.primary.main,
                    theme.palette.action.selectedOpacity,
                ),
            },
        },
    },
}));

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
    const [openEnviarArtigoDialog, setOpenEnviarArtigoDialog] = useState(false);
    const [openCancelarArtigoDialog, setOpenCancelarArtigoDialog] = useState(false);
    const [openRetornarEdicaoArtigoDialog, setRetornarEdicaoArtigoDialog] = useState(false);
    const [openRetornarRevisaoArtigoDialog, setRetornarRevisaoArtigoDialog] = useState(false);
    const [openConcluirEtapaArtigoDialog, setConcluirEtapaArtigoDialog] = useState(false);
    const [selectedArtigo, setSelectedArtigo] = useState(null);
    const [selectedArtigoVisualizar, setSelectedArtigoVisulizar] = useState(null);
    const [openVisualizarArtigoDialog, setOpenVisualizarArtigoDialog] = useState(false);

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

    // const [selectedRedator, setSelectedRedator] = useState("");
    // const [selectedRevisor, setSelectedRevisor] = useState("");
    // const [selectedCliente, setSelectedCliente] = useState("");
    //
    // const [clientes, setClientes] = useState([]);
    // const [redatores, setRedatores] = useState([]);
    // const [revisores, setRevisores] = useState([]);
    //
    // const [novoArtigo, setNovoArtigo] = useState({
    //     titulo: "",
    //     conteudo: "",
    //     palavraChave: "",
    //     // Outros campos do artigo
    // });

    const criarArtigo = () => {
        // Envie os dados do novo artigo para o servidor
        // Atualize a lista de artigos
        closeDialogCriarArtigo();
    };

    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event, params) => {
        setSelectedArtigo(params);
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };


    const columns = [
        {
            field: "actions",
            headerName: "Ações",
            headerClassName: "header-center",
            width: 160,
            renderCell: (params) => (
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <Tooltip title="Abrir artigo no Google Docs" arrow placement="left-start">
                        <span>
                            <Button
                                color="primary"
                                onClick={() => { handleAbrirArtigoDocs(params.row) }}
                                sx={{minWidth: '20px'}}
                                disabled={params.row.estadoAtual === "ABERTO"}
                            >
                                <FileOpenIcon />
                            </Button>
                        </span>

                    </Tooltip>

                    <Tooltip title="Exibir detalhes do artigo" arrow placement="left-start">
                        <span>
                            <Button
                                color="primary"
                                onClick={() => { handleVisualizarArtigo(params.row) }}
                                sx={{minWidth: '20px'}}
                            >
                                <VisibilityIcon />
                            </Button>
                        </span>
                    </Tooltip>

                    <Tooltip title="Mais ações" arrow placement="left-start">
                        <span>
                            <Button
                                id="demo-customized-button"
                                sx={{minWidth: '20px'}}
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                disableElevation
                                onClick={(event) => handleClick(event, params.row)}
                            >
                                <MoreVertIcon />
                            </Button>
                        </span>
                    </Tooltip>

                    <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                            'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={() => handleCancelarArtigo(selectedArtigo)}
                                  disabled={selectedArtigo ? (selectedArtigo.estadoAtual === "CANCELADO" || selectedArtigo.estadoAtual === "ACEITO") : false}
                                  disableRipple>
                            <CancelIcon style={{ color: 'indianred' }} />
                            Cancelar artigo
                        </MenuItem>
                        <MenuItem onClick={() => handleConcluirEtapaArtigoRevisao(selectedArtigo)} disabled={
                            selectedArtigo
                                ? !['EM_EDICAO', 'EM_REVISAO', 'REVISADO'].includes(
                                    selectedArtigo.estadoAtual
                                )
                                : true
                        }
                                  disableRipple>
                            <DoneIcon style={{ color: 'forestgreen' }} />
                            Concluir etapa
                        </MenuItem>
                        <MenuItem onClick={() => handleEnviarArtigo(selectedArtigo)} disabled={selectedArtigo ? selectedArtigo.estadoAtual !== "ABERTO" : false}
                                  disableRipple>
                            <EditIcon style={{ color: '#1976D2' }} />
                            Enviar artigo para edição
                        </MenuItem>
                        <MenuItem onClick={() => handleRetornarArtigoEdicao(selectedArtigo)} disabled={selectedArtigo ? selectedArtigo.estadoAtual !== "EM_REVISAO" : false}
                                  disableRipple>
                            <UndoIcon style={{ color: 'gold' }} />
                            Retornar artigo para edição
                        </MenuItem>
                        <MenuItem onClick={() => handleRetornarArtigoRevisao(selectedArtigo)} disabled={selectedArtigo ? selectedArtigo.estadoAtual !== "REVISADO" : false}
                                  disableRipple>
                            <UndoIcon style={{ color: 'gold' }} />
                            Retornar artigo para revisão
                        </MenuItem>
                    </StyledMenu>
                </div>
            ),
        },
        { field: "id", headerName: "ID", width: 60},
        { field: "titulo", headerName: "Título", width: 200 },
        //{ field: "conteudo", headerName: "Conteúdo", width: 200 },
        { field: "palavraChave", headerName: "Palavra-Chave", width: 140 },
        { field: "redator.nome",
            headerName: "Redator",
            width: 200,
            valueGetter: (params) => params.row.redator.nome
        },
        { field: "revisor.nome",
            headerName: "Revisor",
            width: 200,
            valueGetter: (params) => params.row.revisor.nome},
        { field: "cliente",
            headerName: "Cliente",
            width: 200,
            valueGetter: (params) => params.row.cliente.nome},
        { field: "estadoAtual",
            headerName: "Estado Atual",
            width: 110,
            align: 'center',
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
        // async function fetchSelectData() {
        //     const clientesData = await fetchClientesData();
        //     const redatoresData = await fetchRedatoresData();
        //     const revisoresData = await fetchRevisoresData();
        //
        //     setClientes(clientesData);
        //     setRedatores(redatoresData);
        //     setRevisores(revisoresData);
        // }

        //fetchSelectData();
        startGridArtigo();

    }, []);

    // const fetchClientesData = async () => {
    //     const response = await fetch("http://localhost:8080/usuarios/tipoCliente");
    //     if (response.ok) {
    //         return await response.json();
    //     } else {
    //         toast.error(`Erro na resposta da API: ${response.status}`);
    //         return [];
    //     }
    // };
    //
    // const fetchRedatoresData = async () => {
    //     const response = await fetch("http://localhost:8080/usuarios/tipoRedator");
    //     if (response.ok) {
    //         return await response.json();
    //     } else {
    //         toast.error("Erro ao buscar dados de redatores.");
    //         return [];
    //     }
    // };
    //
    // const fetchRevisoresData = async () => {
    //     const response = await fetch("http://localhost:8080/usuarios/tipoRevisor");
    //     if (response.ok) {
    //         return await response.json();
    //     } else {
    //         toast.error("Erro ao buscar dados de revisores.");
    //         return [];
    //     }
    // };

    const handleEnviarArtigo = (params) => {
        setAnchorEl(null);
        setSelectedArtigo(params);
        setOpenEnviarArtigoDialog(true);
    };
    const handleCancelarArtigo = (params) => {
        setAnchorEl(null);
        setSelectedArtigo(params);
        setOpenCancelarArtigoDialog(true);
    };
    const handleRetornarArtigoEdicao = (params) => {
        setAnchorEl(null);
        setSelectedArtigo(params);
        setRetornarEdicaoArtigoDialog(true);
    };

    const handleRetornarArtigoRevisao = (params) => {
        setAnchorEl(null);
        setSelectedArtigo(params);
        setRetornarRevisaoArtigoDialog(true);
    };

    const handleConcluirEtapaArtigoRevisao = (params) => {
        setAnchorEl(null);
        setSelectedArtigo(params);
        setConcluirEtapaArtigoDialog(true);
    };

    const handleVisualizarArtigo = (params) => {
        setSelectedArtigoVisulizar(params);
        setOpenVisualizarArtigoDialog(true);
    };

    const isAtualizarStatusHabilitado = (artigo) => {
        return artigo.estadoAtual === "EM_EDICAO";
    }

    const  handleAbrirArtigoDocs = (params) => {
        window.open("https://docs.google.com/document/d/" + params.idDocumentoDrive + "/edit", "_blank");
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

                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px'}}>
                            <div>
                                {/*<Button*/}
                                {/*    variant="contained"*/}
                                {/*    color="primary"*/}
                                {/*    onClick={openDialogCriarArtigo}*/}
                                {/*>*/}
                                {/*    Criar Artigo*/}
                                {/*</Button>*/}
                            </div>
                            <div>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    onClick={handleRefresh}
                                >
                                    <RefreshIcon />
                                </Button>
                            </div>
                        </div>

                        <div style={{ marginBottom: "10px", textAlign: "right", height: "600px" }}>
                            <DataGrid rows={artigos.map((artigo) => ({
                                ...artigo,
                                redator: artigo.redator,
                                revisor: artigo.revisor,
                                cliente: artigo.cliente,
                            }))}
                                      columns={columns}
                                      pagination
                                      paginationPageSize={10}
                                      rowsPerPageOptions={[10, 20, 50]}
                                      disableRowSelectionOnClick

                            />
                        </div>

                        <VisualizarArtigoDialog
                            open={openVisualizarArtigoDialog}
                            onClose={() => setOpenVisualizarArtigoDialog(false)}
                            artigo={selectedArtigoVisualizar}
                        />

                        <EnviarArtigoDialog
                            open={openEnviarArtigoDialog}
                            onClose={() => setOpenEnviarArtigoDialog(false)}
                            artigo={selectedArtigo}
                            handleRefresh={startGridArtigo}
                        />

                        <CancelarArtigoDialog
                            open={openCancelarArtigoDialog}
                            onClose={() => setOpenCancelarArtigoDialog(false)}
                            artigo={selectedArtigo}
                            handleRefresh={startGridArtigo}
                        />

                        <RetornarArtigoEdicaoDialog
                            open={openRetornarEdicaoArtigoDialog}
                            onClose={() => setRetornarEdicaoArtigoDialog(false)}
                            artigo={selectedArtigo}
                            handleRefresh={startGridArtigo}
                        />

                        <RetornarArtigoRevisao
                            open={openRetornarRevisaoArtigoDialog}
                            onClose={() => setRetornarRevisaoArtigoDialog(false)}
                            artigo={selectedArtigo}
                            handleRefresh={startGridArtigo}
                        />

                        <ConcluirEtapaDialog
                            open={openConcluirEtapaArtigoDialog}
                            onClose={() => setConcluirEtapaArtigoDialog(false)}
                            artigo={selectedArtigo}
                            handleRefresh={startGridArtigo}
                        />


                        {/*<CriarArtigoDialog*/}
                        {/*    open={openDialog}*/}
                        {/*    onClose={closeDialogCriarArtigo}*/}
                        {/*    // redatores={redatores}*/}
                        {/*    // revisores={revisores}*/}
                        {/*    // clientes={clientes}*/}
                        {/*    //criarArtigo={criarArtigo}*/}
                        {/*    //novoArtigo={novoArtigo}*/}
                        {/*    startGridArtigo={startGridArtigo}*/}
                        {/*    // setNovoArtigo={setNovoArtigo}*/}
                        {/*    // selectedRedator={selectedRedator}*/}
                        {/*    // setSelectedRedator={setSelectedRedator}*/}
                        {/*    // selectedRevisor={selectedRevisor}*/}
                        {/*    // setSelectedRevisor={setSelectedRevisor}*/}
                        {/*    // selectedCliente={selectedCliente}*/}
                        {/*    // setSelectedCliente={setSelectedCliente}*/}
                        {/*/>*/}
                    </Box>
                </Container>
            </div>
        </ThemeProvider>
    );
};

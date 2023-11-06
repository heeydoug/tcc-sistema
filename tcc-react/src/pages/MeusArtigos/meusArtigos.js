import {Button, createTheme, MenuItem, ThemeProvider, Tooltip} from "@mui/material";
import {DataGrid, ptBR} from "@mui/x-data-grid";
import {useAppStore} from "../../configs/appStore";
import Container from "@mui/material/Container";
import {toast, ToastContainer} from "react-toastify";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import RefreshIcon from "@mui/icons-material/Refresh";
import React, {useEffect, useState} from "react";
import {listArticles} from "../../actions/artigos";
import FileOpenIcon from "@mui/icons-material/FileOpen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisualizarArtigoDialog from "../Artigos/visualizarArtigoDialog";
import {alpha, styled} from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DoneIcon from "@mui/icons-material/Done";
import UndoIcon from "@mui/icons-material/Undo";
import EnviarArtigoDialog from "../Artigos/MaisAções/enviarArtigoEdicaoDialog";
import CancelarArtigoDialog from "../Artigos/MaisAções/cancelarArtigoDialog";
import RetornarArtigoEdicaoDialog from "../Artigos/MaisAções/retornarArtigoEdicaoDialog";
import RetornarArtigoRevisao from "../Artigos/MaisAções/retornarArtigoRevisaoDIalog";
import ConcluirEtapaDialog from "../Artigos/MaisAções/concluirEtapaDialog";


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
    const [artigos, setArtigos] = useState([]);
    const [selectedArtigoVisualizar, setSelectedArtigoVisulizar] = useState(null);
    const [openVisualizarArtigoDialog, setOpenVisualizarArtigoDialog] = useState(false);
    const [selectedArtigo, setSelectedArtigo] = useState(null);
    const [openEnviarArtigoDialog, setOpenEnviarArtigoDialog] = useState(false);
    const [openCancelarArtigoDialog, setOpenCancelarArtigoDialog] = useState(false);
    const [openRetornarEdicaoArtigoDialog, setRetornarEdicaoArtigoDialog] = useState(false);
    const [openRetornarRevisaoArtigoDialog, setRetornarRevisaoArtigoDialog] = useState(false);
    const [openConcluirEtapaArtigoDialog, setConcluirEtapaArtigoDialog] = useState(false);
    const handleVisualizarArtigo = (params) => {
        setSelectedArtigoVisulizar(params);
        setOpenVisualizarArtigoDialog(true);
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

    const handleEnviarArtigo = (params) => {
        setAnchorEl(null);
        setSelectedArtigo(params);
        setOpenEnviarArtigoDialog(true);
    };

    const handleAbrirArtigoDocs = (params) => {
        window.open("https://docs.google.com/document/d/" + params.idDocumentoDrive + "/edit", "_blank");
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

    const sessionUser = sessionStorage.getItem("@AuthFirebase:userSession");
    const sessionUserF = JSON.parse(sessionUser);


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
                                sx={{minWidth: '20px'}}
                                onClick={() => { handleAbrirArtigoDocs(params.row) }}
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
                            >
                                <VisibilityIcon />
                            </Button>
                        </span>
                    </Tooltip>

                    <Tooltip title="Mais ações" arrow placement="left-start">
                        <span>
                            <Button
                                id="demo-customized-button"
                                aria-controls={open ? 'demo-customized-menu' : undefined}
                                aria-haspopup="true"
                                aria-expanded={open ? 'true' : undefined}
                                disableElevation
                                sx={{minWidth: '20px'}}
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
                        {/*<MenuItem onClick={() => handleCancelarArtigo(selectedArtigo)}*/}
                        {/*          disabled={selectedArtigo ? (selectedArtigo.estadoAtual === "CANCELADO" || selectedArtigo.estadoAtual === "ACEITO") : false}*/}
                        {/*          disableRipple>*/}
                        {/*    <CancelIcon style={{ color: 'indianred' }} />*/}
                        {/*    Cancelar artigo*/}
                        {/*</MenuItem>*/}
                        <MenuItem
                            onClick={() => {
                                if (
                                    (sessionUserF.tipo === 'REDATOR' && selectedArtigo.estadoAtual === 'EM_EDICAO') ||
                                    (sessionUserF.tipo === 'REVISOR' && selectedArtigo.estadoAtual === 'EM_REVISAO') ||
                                    (sessionUserF.tipo === 'CLIENTE' && selectedArtigo.estadoAtual === 'REVISADO')
                                ) {
                                    handleConcluirEtapaArtigoRevisao(selectedArtigo);
                                }
                            }}
                            disabled={
                                selectedArtigo
                                    ? !(
                                        (sessionUserF.tipo === 'REDATOR' && selectedArtigo.estadoAtual === 'EM_EDICAO') ||
                                        (sessionUserF.tipo === 'REVISOR' && selectedArtigo.estadoAtual === 'EM_REVISAO') ||
                                        (sessionUserF.tipo === 'CLIENTE' && selectedArtigo.estadoAtual === 'REVISADO')
                                    )
                                    : true
                            }
                            disableRipple
                        >
                            <DoneIcon style={{ color: 'forestgreen' }} />
                            Concluir etapa
                        </MenuItem>

                        {/*<MenuItem onClick={() => handleEnviarArtigo(selectedArtigo)} disabled={selectedArtigo ? selectedArtigo.estadoAtual !== "ABERTO" : false}*/}
                        {/*          disableRipple>*/}
                        {/*    <EditIcon style={{ color: '#1976D2' }} />*/}
                        {/*    Enviar artigo para edição*/}
                        {/*</MenuItem>*/}
                        {sessionUserF.tipo === 'REVISOR' ? (
                            <MenuItem
                                onClick={() => {
                                    if (sessionUserF.tipo === 'REVISOR' && selectedArtigo.estadoAtual === 'EM_REVISAO') {
                                        handleRetornarArtigoEdicao(selectedArtigo);
                                    }
                                }}
                                disabled={
                                    selectedArtigo
                                        ? !(sessionUserF.tipo === 'REVISOR' && selectedArtigo.estadoAtual === 'EM_REVISAO')
                                        : false
                                }
                                disableRipple
                            >
                                <UndoIcon style={{ color: 'gold' }} />
                                Retornar artigo para edição
                            </MenuItem>
                        ) : null}

                        {sessionUserF.tipo === 'CLIENTE' && selectedArtigo && selectedArtigo.estadoAtual === 'REVISADO' ? (
                            <MenuItem
                                onClick={() => {
                                    if (sessionUserF.tipo === 'CLIENTE' && selectedArtigo.estadoAtual === 'REVISADO') {
                                        handleRetornarArtigoRevisao(selectedArtigo);
                                    }
                                }}
                                disabled={
                                    selectedArtigo
                                        ? !(sessionUserF.tipo === 'CLIENTE' && selectedArtigo.estadoAtual === 'REVISADO')
                                        : false
                                }
                                disableRipple
                            >
                                <UndoIcon style={{ color: 'gold' }} />
                                Retornar artigo para revisão
                            </MenuItem>
                        ) : null }

                    </StyledMenu>
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

                    <VisualizarArtigoDialog
                        open={openVisualizarArtigoDialog}
                        onClose={() => setOpenVisualizarArtigoDialog(false)}
                        artigo={selectedArtigoVisualizar}
                    />

                    <EnviarArtigoDialog
                        open={openEnviarArtigoDialog}
                        onClose={() => setOpenEnviarArtigoDialog(false)}
                        artigo={selectedArtigo}
                        handleRefresh={fetchData}
                    />

                    <CancelarArtigoDialog
                        open={openCancelarArtigoDialog}
                        onClose={() => setOpenCancelarArtigoDialog(false)}
                        artigo={selectedArtigo}
                        handleRefresh={fetchData}
                    />

                    <RetornarArtigoEdicaoDialog
                        open={openRetornarEdicaoArtigoDialog}
                        onClose={() => setRetornarEdicaoArtigoDialog(false)}
                        artigo={selectedArtigo}
                        handleRefresh={fetchData}
                    />

                    <RetornarArtigoRevisao
                        open={openRetornarRevisaoArtigoDialog}
                        onClose={() => setRetornarRevisaoArtigoDialog(false)}
                        artigo={selectedArtigo}
                        handleRefresh={fetchData}
                    />

                    <ConcluirEtapaDialog
                        open={openConcluirEtapaArtigoDialog}
                        onClose={() => setConcluirEtapaArtigoDialog(false)}
                        artigo={selectedArtigo}
                        handleRefresh={fetchData}
                    />

                </Container>
            </div>
        </ThemeProvider>
    );

}
import React, {useEffect, useState} from "react";
import {
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    TextField,
    Select,
    Button, Autocomplete,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {gapi} from "gapi-script";
import { makeStyles } from "@mui/styles";
import {createArticle, updateArticle} from "../../actions/artigos";
import { toast, ToastContainer } from "react-toastify";
import "./artigos.css"
import {getClienteById, getUserByEmail} from "../../actions/usuarios";

const clientId = "308424476532-e40blk46kh67iussdbce2655m9lnacoq.apps.googleusercontent.com";
const apiKey = "API_KEY";
const scopes = "https://www.googleapis.com/auth/drive";

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
export const CriarArtigoDialog = ({
                                      open,
                                      onClose,
                                      selectedRow,
                                      // redatores,
                                      // revisores,
                                      // clientes,
                                      // novoArtigo,
                                      // setNovoArtigo,
                                      // selectedRedator,
                                      // setSelectedRedator,
                                      // selectedRevisor,
                                      // setSelectedRevisor,
                                      // selectedCliente,
                                      // setSelectedCliente,
                                      startGridArtigo,

                                  }) => {

    // Função para redefinir os valores dos campos para nulo
    const resetDialogFields = () => {
        setNovoArtigo({
            titulo: "",
            conteudo: "",
            palavraChave: "",
        });
        setSelectedRedator("");
        setSelectedRevisor("");
        setSelectedCliente("");
    };

    const [selectedRedator, setSelectedRedator] = useState("");
    const [selectedRevisor, setSelectedRevisor] = useState("");
    const [selectedCliente, setSelectedCliente] = useState("");

    const [clientes, setClientes] = useState([]);
    const [redatores, setRedatores] = useState([]);
    const [revisores, setRevisores] = useState([]);
    const [clientePedido, setClientePedido] = useState([]);
    const [novoArtigo, setNovoArtigo] = useState({
        titulo: "",
        conteudo: "",
        palavraChave: "",
        // Outros campos do artigo
    });

    async function fetchSelectData() {
        const clientesData = await fetchClientesData();
        const redatoresData = await fetchRedatoresData();
        const revisoresData = await fetchRevisoresData();
        setClientes(clientesData);
        setRedatores(redatoresData);
        setRevisores(revisoresData);

    }

    //Criando as funções para criar artigo
    function zeroFill(i) {
        return (i < 10 ? '0' : '') + i;
    }

    function getDateString() {
        const date = new Date();
        const year = date.getFullYear();
        const month = zeroFill(date.getMonth() + 1);
        const day = zeroFill(date.getDate());
        return day + '/' + month + '/' + year;
    }

    function getTimeString() {
        const date = new Date();
        return date.toLocaleTimeString();
    }


    useEffect(() => {
        function start() {
            gapi.client.init({
                apiKey: apiKey,
                clientId: clientId,
                scope: scopes
            });
        }
        gapi.load('client:auth2', start);
        fetchSelectData();
        startGridArtigo();
    }, []);

    useEffect(() => {
        if (selectedRow) {
            setNovoArtigo((prevNovoArtigo) => ({
                ...prevNovoArtigo,
                conteudo: selectedRow.conteudo || "",
            }));
        }
    }, [selectedRow]);

    useEffect(() => {
        async function fetchCliente() {
            if (selectedRow?.clienteId) {
                const cliente = await getClienteById(selectedRow?.clienteId);
                setClientePedido(cliente);
                console.log(clientePedido)
            } else {
                setClientePedido(null); // Limpa o cliente se não houver clienteId
            }
        }

        fetchCliente();
    }, [selectedRow]);


    const createGoogleDriveDocument = (tag) => {
        const token = sessionStorage.getItem("@AuthFirebase:token");
        var accessToken = gapi.auth.getToken().access_token;
        var fileName = tag + "- " + getDateString() + " - " + getTimeString();

        return new Promise((resolve, reject) => {
            fetch('https://docs.googleapis.com/v1/documents?title=' + fileName, {
                method: "POST",
                headers: new Headers({ 'Authorization': 'Bearer ' + accessToken })
            })
                .then((res) => res.json())
                .then(function (val) {
                    const folderName = tag;

                    //Pasta antiga
                    //const parentFolderId = '1EJrk68WbOvnuCEYN6qkQ1WlmWk2CksVr';

                    //Pasta nova
                    const parentFolderId = '1PoY2KvUQsLXIQACQDpxS3ruCmIefEabM';

                    const folderMetadata = {
                        name: folderName,
                        mimeType: 'application/vnd.google-apps.folder',
                        parents: [parentFolderId]
                    };

                    gapi.client.load('drive', 'v3', function () {
                        gapi.client.drive.files.create({
                            resource: folderMetadata,
                            fields: 'id'
                        }).then(function (response) {
                            const folderId = response.result.id;
                            const fileId = val.documentId;
                            const folderIdN = folderId;

                            const updateRequest = gapi.client.drive.files.update({
                                fileId: fileId,
                                addParents: folderIdN,
                                fields: 'id, parents',
                            });

                            updateRequest.execute(function (response) {
                                resolve({
                                    idDocumentoDrive: val.documentId,
                                    idPastaDrive: folderId,
                                });
                            });
                        });
                    });
                    //window.open("https://docs.google.com/document/d/" + val.documentId + "/edit", "_blank");
                })
                .catch((error) => {
                    toast.error('Erro na função createGoogleDriveDocument:', error);
                    reject(error);
                });
        });
    };

    const handleExcluir = (id) => {
        fetch(`http://localhost:8080/pedidos/${id}`, {
            method: "DELETE",
        })
            .then((response) => {
                if (response.ok) {
                    startGridArtigo();
                } else {
                    toast.error("Erro ao excluir o pedido de artigo.");
                }
            })
            .catch((error) => {
                toast.error("Erro na solicitação:", error);
            });

    };


    const criarArtigo = async () => {
        if (
            novoArtigo.titulo === "" ||
            novoArtigo.conteudo === "" ||
            novoArtigo.palavraChave === "" ||
            !selectedRedator ||
            !selectedRevisor ||
            !clientePedido
        ) {
            toast.warning("Preencha todos os campos antes de criar o artigo.");

            return;
        }
        try {
            // Criando documento no Google Drive
            const fileName = novoArtigo.titulo + " ";
            const { idDocumentoDrive, idPastaDrive } = await createGoogleDriveDocument(fileName);

            // Objeto com os dados do artigo
            const artigoData = {
                titulo: novoArtigo.titulo,
                conteudo: novoArtigo.conteudo,
                palavraChave: novoArtigo.palavraChave,
                idPastaDrive: idPastaDrive,
                idDocumentoDrive: idDocumentoDrive,
                id: null, //ID em branco para que o banco de dados o gere automaticamente
                redator: selectedRedator,
                revisor: selectedRevisor,
                cliente: clientePedido,
                estadoAtual: "ABERTO",
                historicoEstados: [
                    {
                        artigo: {
                            id: null,
                        },
                        data_registro: getDateString(),
                        estado: "ABERTO"
                    }
                ]
            };

            // Fazendo a solicitação POST para o backend para criar o artigo
            const createdArticleResponse = await createArticle(artigoData);
            toast.success(
                <span>
                    Artigo "<span style={{ color: '#07BC0C' }}>{artigoData.titulo}</span>" criado com sucesso!
                </span>
            );

            onClose();
            resetDialogFields();
            handleExcluir(selectedRow.id)
            startGridArtigo();

        } catch (error) {
            console.log(error)
            toast.error('Erro:', error);
        }
    };


    return (
        <Dialog open={open} onClose={() => { onClose(); resetDialogFields(); }} aria-labelledby="form-dialog-title">
            <ToastContainer
                position="top-right"
                autoClose={3000}
                pauseOnFocusLoss
                draggable
                hideProgressBar={false}
            />
            <DialogTitle id="form-dialog-title">Criar Artigo</DialogTitle>
            <DialogContent>
                <Grid container spacing={2} sx={{ paddingTop: "2%" }}>
                    <Grid item xs={12}>
                        <TextField
                            label="Título"
                            fullWidth
                            value={novoArtigo.titulo}
                            onChange={(e) =>
                                setNovoArtigo({ ...novoArtigo, titulo: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Conteúdo"
                            fullWidth
                            multiline
                            rows={4}
                            value={novoArtigo.conteudo}
                            onChange={(e) =>
                                setNovoArtigo({ ...novoArtigo, conteudo: e.target.value })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            label="Palavra-Chave"
                            fullWidth
                            value={novoArtigo.palavraChave}
                            onChange={(e) =>
                                setNovoArtigo({
                                    ...novoArtigo,
                                    palavraChave: e.target.value,
                                })
                            }
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            options={redatores}
                            getOptionLabel={(option) => option ? option.nome : ''}
                            value={selectedRedator}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(e, newValue) => setSelectedRedator(newValue)}
                            renderInput={(params) => <TextField {...params} label="Redator" fullWidth />}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Autocomplete
                            options={revisores}
                            getOptionLabel={(option) => option ? option.nome : ''}
                            value={selectedRevisor}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(e, newValue) => setSelectedRevisor(newValue)}
                            renderInput={(params) => <TextField {...params} label="Revisor" fullWidth />}
                        />
                    </Grid>

                    <Grid item xs={12}>
                        <Autocomplete
                            options={clientes}
                            getOptionLabel={(option) => option ? option.nome : ''}
                            value={clientePedido}
                            renderInput={(params) => <TextField {...params} label="Cliente" fullWidth />}
                        />
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { onClose(); resetDialogFields(); }} sx={{
                    color: "indianred"
                }}>
                    Cancelar
                </Button>
                <Button onClick={criarArtigo} color="primary">
                    Criar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

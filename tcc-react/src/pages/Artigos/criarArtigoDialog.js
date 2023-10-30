import React, { useState } from "react";
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
import {createArticle, updateArticle} from "../../actions/artigos";

import { toast, ToastContainer } from "react-toastify";
export const CriarArtigoDialog = ({
                                      open,
                                      onClose,
                                      redatores,
                                      revisores,
                                      clientes,
                                      novoArtigo,
                                      setNovoArtigo,
                                      selectedRedator,
                                      setSelectedRedator,
                                      selectedRevisor,
                                      setSelectedRevisor,
                                      selectedCliente,
                                      setSelectedCliente,
                                      handleRefresh
                                  }) => {

    const [buttonClicked, setButtonClicked] = useState(false);

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

    const createGoogleDriveDocument = (tag) => {
        const token = sessionStorage.getItem("@AuthFirebase:token");
        console.log("Token do Firebase", token);
        var accessToken = "ya29.a0AfB_byABoy0AvwRr69K7ifnOO3X8rdzB8NllJhPBGbozgjBy2A7nnUzJdv7_IM2yAAytJLvWtTJdzzWUEjis7i8-ezdnKvBZWA4tNOm8zETTgvbe8nv95h6I7eBak2pfrPFYPRxFccu-8eJ-QUz12CyfoJwS9Y9tY7waCgYKAZYSARMSFQGOcNnCbGRZ3VV_4aG_yjNtFm739A0170";
        console.log(accessToken);
        var fileName = tag + " " + getDateString() + " " + getTimeString();

        return new Promise((resolve, reject) => {
            fetch('https://docs.googleapis.com/v1/documents?title=' + fileName, {
                method: "POST",
                headers: new Headers({ 'Authorization': 'Bearer ' + accessToken })
            })
                .then((res) => res.json())
                .then(function (val) {
                    console.log(val);
                    console.log(val.documentId);

                    const folderName = tag;
                    const parentFolderId = '1EJrk68WbOvnuCEYN6qkQ1WlmWk2CksVr';

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
                            console.log('Pasta criada com sucesso. ID da pasta:', folderId);

                            const fileId = val.documentId;
                            const folderIdN = folderId;

                            const updateRequest = gapi.client.drive.files.update({
                                fileId: fileId,
                                addParents: folderIdN,
                                fields: 'id, parents',
                            });

                            updateRequest.execute(function (response) {
                                console.log('Documento atualizado:', response);
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


    const criarArtigo = async () => {
        // Validação dos campos
        if (
            novoArtigo.titulo === "" ||
            novoArtigo.conteudo === "" ||
            novoArtigo.palavraChave === "" ||
            !selectedRedator ||
            !selectedRevisor ||
            !selectedCliente
        ) {
            toast.warning("Preencha todos os campos antes de criar o artigo.");

            return;
        }
        try {
            // Criando documento no Google Drive
            const fileName = novoArtigo.titulo + " " + getDateString() + " " + getTimeString();
            const { idDocumentoDrive, idPastaDrive } = await createGoogleDriveDocument(fileName);

            // Objeto com os dados do artigo
            const artigoData = {
                titulo: novoArtigo.titulo,
                conteudo: novoArtigo.conteudo,
                palavraChave: novoArtigo.palavraChave,
                idPastaDrive: idPastaDrive, // ID da pasta no Google Drive
                idDocumentoDrive: idDocumentoDrive, // ID do documento no Google Drive
                id: null, // Deixe o ID em branco para que o banco de dados o gere automaticamente
                redator: selectedRedator,
                revisor: selectedRevisor,
                cliente: selectedCliente,
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

            // Faça a solicitação POST para o backend para criar o artigo
            const createdArticleResponse = await createArticle(artigoData);


            // Aguarde a resposta do backend e obtenha o ID do artigo
            const artigoCriado = createdArticleResponse.id;

            const idDoArtigo = artigoCriado;


            // Agora, atualize o ID do artigo na parte de historicoEstados
            artigoData.historicoEstados[0].artigo.id = idDoArtigo;

            // Faça a solicitação para atualizar o artigo usando a função updateArticle
            const updatedArticle = await updateArticle(idDoArtigo, artigoData);
            console.log("Artigo atualizado com sucesso:", updatedArticle);

            toast.success("Artigo '" + artigoData.titulo + "' criado com sucesso!");

            onClose();
            resetDialogFields();
            handleRefresh();

        } catch (error) {
            toast.error("Erro ao fazer a solicitação:", error);
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
                            value={selectedCliente}
                            isOptionEqualToValue={(option, value) => option.id === value.id}
                            onChange={(e, newValue) => setSelectedCliente(newValue)}
                            renderInput={(params) => <TextField {...params} label="Cliente" fullWidth />}
                        />
                    </Grid>

                </Grid>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => { onClose(); resetDialogFields(); }} color="primary">
                    Cancelar
                </Button>
                <Button onClick={criarArtigo} color="secondary">
                    Criar
                </Button>
            </DialogActions>
        </Dialog>
    );
};

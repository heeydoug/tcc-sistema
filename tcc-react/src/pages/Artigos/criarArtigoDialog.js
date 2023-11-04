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

const clientId = "308424476532-e40blk46kh67iussdbce2655m9lnacoq.apps.googleusercontent.com";
const apiKey = "API_KEY";
const scopes = "https://www.googleapis.com/auth/drive";
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
    }, []);

    const createGoogleDriveDocument = (tag) => {
        const token = sessionStorage.getItem("@AuthFirebase:token");
        console.log("Token do Firebase", token);
        var accessToken = gapi.auth.getToken().access_token;
        //var accessToken = "ya29.a0AfB_byDYlpivh_ZTL1QX8g8BPV-tbzRlH9hm8VnS0lBjh5NNVhHywF4q1oF1mP3CGSbzrG_eLyA2A5lJr5SQks-hdeEf-Dkcsbv_m3jIHR5wgUGQ8SuanKOQqpwxJPhkwPyofxQFavQMHt_VT1K-b7pKA94K9UriUN0aCgYKAQgSARMSFQGOcNnCxTyDy_tvcz1QeqHQ62R_nw0170";
        console.log(accessToken);
        var fileName = tag + "- " + getDateString() + " - " + getTimeString();

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

                    //Pasta antiga
                    //const parentFolderId = '1EJrk68WbOvnuCEYN6qkQ1WlmWk2CksVr';

                    //Pasta nova
                    const parentFolderId = '1vDJUQYI8dv3MyD4Ss2UxusUfBVZDgy4P';

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


            // Fazendo a solicitação POST para o backend para criar o artigo
            const createdArticleResponse = await createArticle(artigoData);

            console.log("Artigo Criado", createdArticleResponse);
            //
            // // Resposta do backend para obter o ID do artigo
            // const artigoCriado = createdArticleResponse.id;
            //
            // const idDoArtigo = artigoCriado;
            //
            //
            // // Atualizando o ID do artigo na parte de historicoEstados
            // artigoData.historicoEstados[0].artigo.id = idDoArtigo;
            //
            // // Fazendo a solicitação para atualizar o artigo usando a função updateArticle
            // const updatedArticle = await updateArticle(idDoArtigo, artigoData);
            // console.log("Artigo atualizado com sucesso:", updatedArticle);

            toast.success(
                <span>
                    Artigo " <span style={{ color: '#07BC0C' }}>{artigoData.titulo}</span>" criado com sucesso!
                </span>
            );

            onClose();
            resetDialogFields();
            startGridArtigo();

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

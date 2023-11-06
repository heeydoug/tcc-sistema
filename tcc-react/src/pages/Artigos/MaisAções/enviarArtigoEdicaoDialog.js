import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {toast} from "react-toastify";
import {DialogContent, Typography} from "@mui/material";

import {updateStatusArtigo} from "../../../actions/artigos";
import {gapi} from "gapi-script";

const clientId = "308424476532-e40blk46kh67iussdbce2655m9lnacoq.apps.googleusercontent.com";
const apiKey = "API_KEY";
const scopes = "https://www.googleapis.com/auth/drive";

export default function EnviarArtigoDialog({ open, onClose, onEnviarArtigo, artigo, handleRefresh }) {
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

    const [confirmarEnvio, setConfirmarEnvio] = useState(false);

    function addPermissions(email, userRole) {
        const folderId = artigo.idPastaDrive

        const permission = {
            type: 'user',
            role: userRole,
            emailAddress: email,
        };

        gapi.client.drive.permissions.create({
            fileId: folderId,
            resource: permission,
        }).then(function(response) {

        });
    }

    const handleSimClick = async () => {
        try {

            const response = await updateStatusArtigo(artigo.id, "EM_EDICAO");
            setConfirmarEnvio(false);

            /*  Permissão do Redator */
            addPermissions(artigo.redator.email, 'writer')

            /*  Permissão do Revisor*/
            addPermissions(artigo.revisor.email,'commenter')

            /*  Permissão do Cliente */
            addPermissions(artigo.cliente.email, 'reader')

            toast.success("Artigo enviado com sucesso!", response);
            onClose();
            handleRefresh();

        } catch (error) {
            setConfirmarEnvio(false);
            toast.error("Erro ao enviar o artigo:", error);
        }
    };

    const handleFechar = () => {
        setConfirmarEnvio(false);
        onClose();
    };

    return (
        <Dialog open={open} onClose={handleFechar}>
            <DialogTitle>Enviar Artigo</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Gostaria de enviar o artigo {artigo ? JSON.stringify(artigo.id) + " - " + JSON.stringify(artigo.titulo) : ''} para edição?
                </Typography>
            </DialogContent>
            <DialogActions>
                {!confirmarEnvio ? (
                    <>
                        <Button color="primary" onClick={handleFechar}>
                            Não
                        </Button>
                        <Button color="secondary" onClick={handleSimClick}>
                            Sim
                        </Button>
                    </>
                ) : (
                    <Button variant="contained" color="primary" onClick={handleFechar}>
                        Fechar
                    </Button>
                )}
            </DialogActions>
        </Dialog>
    );
}

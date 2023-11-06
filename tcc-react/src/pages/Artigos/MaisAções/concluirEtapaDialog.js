import React, {useState} from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Typography} from "@mui/material";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import {updateStatusArtigo} from "../../../actions/artigos";
import {toast} from "react-toastify";

const ConcluirEtapaArtigo = ({ open, onClose, onEnviarArtigo, artigo, handleRefresh }) => {

    const [confirmarEnvio, setConfirmarEnvio] = useState(false);
    const handleFechar = () => {
        setConfirmarEnvio(false);
        onClose();
    };

    const handleSimClick = async () => {
        try {

            const response = await updateStatusArtigo(artigo.id, "CANCELADO");
            setConfirmarEnvio(false);

            // /*  Permissão do Redator */
            // addPermissions(artigo.redator.email, 'writer')
            //
            // /*  Permissão do Revisor*/
            // addPermissions(artigo.revisor.email,'commenter')
            //
            // /*  Permissão do Cliente */
            // addPermissions(artigo.cliente.email, 'reader')

            toast.success("Artigo cancelado com sucesso!", response);
            onClose();
            handleRefresh();

        } catch (error) {
            setConfirmarEnvio(false);
            toast.error("Erro ao cancelar artigo:", error);
        }
    };

    return (
        <Dialog open={open} onClose={handleFechar}>
            <DialogTitle>Concluir Etapa Artigo</DialogTitle>
            <DialogContent>
                <Typography variant="body1">
                    Tem certeza que deseja{" "}
                    <span style={{ color: "forestgreen" }}>concluir</span> esta etapa do artigo {" "}

                    <span style={{ color: "#1976D2" }}>{artigo ? JSON.stringify(artigo.id) + " - " + JSON.stringify(artigo.titulo) : ''}</span>?
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
};

export default ConcluirEtapaArtigo;

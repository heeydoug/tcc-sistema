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

            if(artigo.estadoAtual === 'EM_EDICAO'){
                const response = await updateStatusArtigo(artigo.id, "EM_REVISAO")
            }
            if(artigo.estadoAtual === 'EM_REVISAO'){
                const response = await updateStatusArtigo(artigo.id, "REVISADO")
            }
            if(artigo.estadoAtual === 'REVISADO'){
                const response = await updateStatusArtigo(artigo.id, "ACEITO")
            }

            setConfirmarEnvio(false);

            toast.success("Etapa do artigo concluída com sucesso!");
            onClose();
            handleRefresh();

        } catch (error) {
            setConfirmarEnvio(false);
            toast.error("Erro ao concluir etapa do artigo:", error);
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

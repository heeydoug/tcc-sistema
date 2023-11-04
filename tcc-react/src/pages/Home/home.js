import React, {useContext, useEffect} from "react";
import {AuthGoogleContext} from "../../contexts/authGoogle";
import {gapi} from 'gapi-script';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";

import "../../components/skeleton.css";
import "../../actions/utils/util.css"
import {useAppStore} from "../../configs/appStore";
const clientId = "308424476532-e40blk46kh67iussdbce2655m9lnacoq.apps.googleusercontent.com";
const apiKey = "API_KEY";
const scopes = "https://www.googleapis.com/auth/drive";

export const Home = () => {
  const dopen = useAppStore((state) => state.dopen);

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

  // useEffect(() => {
  //   const start = async () => {
  //     await gapi.client.init({
  //       apiKey: apiKey,
  //       clientId: clientId,
  //       scope: scopes,
  //     });
  //
  //     // Autenticar o usuário, se necessário
  //     await gapi.auth2.getAuthInstance().signIn();
  //
  //     // Agora você pode acessar o token de autenticação
  //     const accessToken = gapi.auth.getToken().access_token;
  //     console.log(accessToken);
  //
  //     // Chame a função createFile aqui ou em resposta a algum evento
  //   };
  //
  //   gapi.load('client:auth2', start);
  // }, []);

  function createFile(tag) {
    const token = sessionStorage.getItem("@AuthFirebase:token");
    console.log("Token do firebase", token)
    var accessToken = gapi.auth.getToken().access_token;

    //var accessToken = "ya29.a0AfB_byBXSVsgD_MQmqZ73V0fUcvKLZzkKIwo2ksBoqqhAtkcNnYmuHQLnkwvZWXnHTW74Tq9AXvCyUNtECIFjZBq-PvV4viYPuU3FbqEai3KOyRQASV6uE6tWJ6jxiYyIW7baH-MHFFAZRcQjuL7I6KIFK8KSZIVlGEaCgYKAZkSARMSFQGOcNnChZv6ymSsXzZGvSqdk7EJzw0170"
    console.log(accessToken)
    var fileName = tag + " " + getDateString() + " " + getTimeString();
    fetch('https://docs.googleapis.com/v1/documents?title=' + fileName, {
      method: "POST",
      headers: new Headers({ 'Authorization': 'Bearer ' + accessToken })
    }).then((res) => {
      return res.json();
    }).then(function (val) {
      console.log(val);
      console.log(val.documentId);

      const folderName = 'Teste TCC - Douglas e Clarisse com o Firebase agora';
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
          return folderId;

        }).then(function (folderId) {
          const fileId = val.documentId;
          const folderIdN = folderId;
          const updateRequest = gapi.client.drive.files.update({
            fileId: fileId,
            addParents: folderIdN,
            fields: 'id, parents',
          });
          updateRequest.execute(function (response) {
            console.log('Documento atualizado:', response);
          });
        });
      });
      window.open("https://docs.google.com/document/d/" + val.documentId + "/edit", "_blank");
    });
  }
  const cardStyle = {
    padding: 20,
    width: "100%",
    backgroundColor: "#f9f9f9",
    boxShadow: "0px 4px 4px rgba(0, 0, 0, 0.1)",
  };

  const { user, signOut } = useContext(AuthGoogleContext);
  const userLogged = user;

  return (
      <div className={`container ${dopen ? 'open' : ''}`}>
        <Container>
          <Box height={70} />
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <Paper elevation={3}>
                <Card variant="outlined" sx={{ p: 4, width: "100%" }}>
                  <CardContent>
                    <Box mt={2}>
                      <Typography variant="h3" component="div" gutterBottom fontWeight="bold">
                        Bem-vindo, {userLogged.displayName}!
                      </Typography>
                      <hr />
                      <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                        Explore nossa plataforma de integração de processos para serviços freelancers de redação de artigos.
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                        Nossa aplicação foi projetada para simplificar e aprimorar cada aspecto da sua jornada como redator freelancer.
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                        Imagine a capacidade de gerir projetos de redação com eficiência e escrever de forma simplificada, sem burocracias e obstáculos. Com nossa aplicação, isso se torna realidade, facilitando a sua jornada como redator freelancer.
                      </Typography>
                      <Typography variant="body1" paragraph sx={{ textAlign: 'justify' }}>
                        Aqui, você pode criar e gerenciar projetos de redação, colaborar de forma eficaz com clientes e colegas, e monitorar todo o seu progresso em um único painel intuitivo. Esqueça as complicações e concentre-se no que você faz de melhor: escrever artigos excepcionais.
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </div>
  );
}

export default Home;

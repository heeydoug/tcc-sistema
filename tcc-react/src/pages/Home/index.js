import React, { useContext, useEffect } from "react";
import { AuthGoogleContext } from "../../contexts/authGoogle";
import { gapi } from 'gapi-script';
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Paper from "@mui/material/Paper";

const clientId = "308424476532-e40blk46kh67iussdbce2655m9lnacoq.apps.googleusercontent.com";
const apiKey = "API_KEY";
const scopes = "https://www.googleapis.com/auth/drive";

export const Home = () => {
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

  function createFile(tag) {
    var accessToken = gapi.auth.getToken().access_token;
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

  const { user, signOut } = useContext(AuthGoogleContext);
  const userLogged = user;

  return (
      <Container>
        <Box height={70} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Paper elevation={3}>
              <Card variant="outlined" sx={{ p: 4 }}>
                <CardContent>
                  <Box mt={2}>
                    <Typography variant="h3" component="div" gutterBottom fontWeight="bold">
                      Bem vindo, {userLogged.displayName}!
                    </Typography>
                    <hr />
                    <Typography variant="body1" paragraph>
                      E essa é sua área administrativa, utilize um dos menus ou botões abaixo para navegar pelo sistema.
                    </Typography>
                    <Button variant="contained" color="primary" size="large" onClick={() => createFile('Teste 2: Firebase -')}>
                      Criar Documento
                    </Button>
                  </Box>
                  <Box mt={2}>
                    <Typography variant="h5">Informações do Usuário</Typography>
                    <Grid container spacing={2}>
                      <Grid item>
                        <Avatar alt="Profile" src={userLogged.photoURL} />
                      </Grid>
                      <Grid item>
                        <Typography variant="subtitle1">Nome: {userLogged.displayName}</Typography>
                        <Typography variant="subtitle1">Email: {userLogged.email}</Typography>
                      </Grid>
                    </Grid>
                    <Button variant="outlined" color="secondary" onClick={() => signOut()}>Sair</Button>
                  </Box>
                </CardContent>
              </Card>
            </Paper>
          </Grid>
        </Grid>
      </Container>
  );
}

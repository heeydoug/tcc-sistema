import {useContext, useEffect} from "react";
import {AuthGoogleContext} from "../../contexts/authGoogle";
import { gapi } from 'gapi-script';
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
//
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


      const folderName = 'Teste TCC - Dougla e Clarisse com o Firebase agora'; // Nome da pasta que deseja criar
      const parentFolderId = '1EJrk68WbOvnuCEYN6qkQ1WlmWk2CksVr'; // ID da pasta pai onde deseja criar a nova pasta

      const folderMetadata = {
        name: folderName,
        mimeType: 'application/vnd.google-apps.folder',
        parents: [parentFolderId]
      };

      gapi.client.load('drive', 'v3', function() {
        gapi.client.drive.files.create({
          resource: folderMetadata,
          fields: 'id'
        }).then(function(response) {
          const folderId = response.result.id;
          console.log('Pasta criada com sucesso. ID da pasta:', folderId);
          return folderId;

        }).then(function(folderId){

          const fileId = val.documentId; // ID do documento criado
          const folderIdN = folderId; // ID da pasta em que deseja associar o documento

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

  const { user, signOut } = useContext(AuthGoogleContext)
  let userLogged = JSON.parse(user)
  console.log(userLogged)
  return (
      <div>
          <h1>Home</h1>
          <h1>Bem vindo, {userLogged.displayName}</h1>
          <button className="btn btn-primary btn-lg mt-3" onClick={() => createFile('Teste 2: Firebase -')}>
              Criar Documento
          </button>

        <div style={{ textAlign: "center" }}>
          <h1>Informações do Usuário</h1>
          <img className="profile" src={userLogged.photoURL} alt="Profile" />
          <p>Nome: {userLogged.displayName}</p>
          <p>Email: {userLogged.email}</p>
        </div>

        <button onClick={() => signOut()}>Sair</button>
      </div>
  )
}

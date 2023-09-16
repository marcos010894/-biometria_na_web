var dadossalvos = {};
// Verifique se o navegador suporta WebAuthn
if (window.PublicKeyCredential) {
  const loginButton = document.getElementById("createdButton");

  // Event listener para o botão de login
  loginButton.addEventListener("click", async () => {
    try {
      // Recupere os parâmetros da credencial armazenados no localStorage
      const storedCredentialParams = localStorage.getItem("credentialParams");

      if (storedCredentialParams) {
        let splited = storedCredentialParams.split(',')
        const publicKeyCredentialRequestOptions = {
          challenge: new Uint8Array(32),
          allowCredentials: [
            {
              id: uint8Array = new Uint8Array(splited),
              type: "public-key"
            },
          ],
          timeout: 60000,
        };

        const assertion = await navigator.credentials.get({
          publicKey: publicKeyCredentialRequestOptions,
        });

        if (assertion) {
          alert("logado com sucesso");

        }
      } else {
        const publicKeyCredentialCreationOptions = {
          challenge: new Uint8Array(32),
          rp: {
            name: "eaglesoftwaremarcos",
            id: "eaglesoftware.com.br",
          },
          user: {
            id: new Uint8Array(16), // Identificador único do usuário
            name: "Marcos Paulo", // Nome do usuário
            displayName: "Machadinho", // Nome a ser exibido
          },
          pubKeyCredParams: [{ alg: -7, type: "public-key" }],
          
          timeout: 60000,
        };

        const credential = await navigator.credentials.create({
          publicKey: publicKeyCredentialCreationOptions,
        });

        const utf8Decoder = new TextDecoder("utf-8");
        const decodedClientData = utf8Decoder.decode(
          credential.response.clientDataJSON
        );

        // parse the string as an object
        const clientDataObj = JSON.parse(decodedClientData);
        console.log("etapa 1 da validação");
        console.log(clientDataObj);

        // note: a CBOR decoder library is needed here.
        const decodedAttestationObj = CBOR.decode(
          credential.response.attestationObject
        );

        console.log("etapa 2 da validação");
        console.log(decodedAttestationObj);

        const { authData } = decodedAttestationObj;

        // get the length of the credential ID
        const dataView = new DataView(new ArrayBuffer(2));
        const idLenBytes = authData.slice(53, 55);
        idLenBytes.forEach((value, index) => dataView.setUint8(index, value));
        const credentialIdLength = dataView.getUint16();

        // get the credential ID
        const credentialId = authData.slice(55, 55 + credentialIdLength);

        // get the public key object
        const publicKeyBytes = authData.slice(55 + credentialIdLength);

        // the publicKeyBytes are encoded again as CBOR
        const publicKeyObject = CBOR.decode(publicKeyBytes.buffer);
        console.log(publicKeyObject);

        localStorage.setItem("credentialParams", credentialId);

        console.log(credential);

        const credencialView = document.getElementById("credencialView");
        credencialView.innerHTML = `
          Credencial criada. Tente fazer login novamente.
        `;
        loginButton.innerText = "Fazer login novamente";
      }
    } catch (error) {
      console.error("Erro durante a autenticação biométrica:", error);
    }
  });
} else {
  console.error("Seu navegador não suporta WebAuthn.");
}

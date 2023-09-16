# Projeto de Autenticação Biométrica na Web

Este é um projeto de exemplo de autenticação biométrica na web que você pode usar como ponto de partida para o seu próprio sistema de autenticação. Certifique-se de seguir os passos abaixo para configurar e executar o projeto.

## Pré-requisitos

- Certifique-se de ter um servidor com suporte a HTTPS configurado e em execução para este projeto.

## Configuração do Credencial ID

As tratativas para a criação do credencial ID devem ser realizadas via o servidor e os dados devem ser salvos no banco de dados vinculado ao usuário. Você pode personalizar essa parte de acordo com suas necessidades específicas. Aqui está um exemplo de como pode ser feito:

1. O usuário se registra no sistema e cria uma conta.
2. Durante o processo de registro, as informações biométricas, como impressões digitais ou reconhecimento facial, são capturadas e enviadas para o servidor.
3. O servidor gera um credencial ID exclusivo para o usuário com base nas informações biométricas e o associa à conta do usuário no banco de dados.
4. Quando o usuário tenta fazer login, o servidor verifica a correspondência biométrica e, se for bem-sucedida, concede acesso à conta do usuário.

Lembre-se de que este é apenas um exemplo e você pode personalizar as etapas de acordo com suas necessidades específicas.

## Personalização

Você pode personalizar este projeto de acordo com suas próprias necessidades. Sinta-se à vontade para fazer alterações no código, na interface do usuário e nas configurações de segurança conforme necessário.

## Executando o Projeto

1. Clone este repositório em seu servidor.
2. Certifique-se de que o servidor esteja configurado para HTTPS.
3. Inicie o servidor.
4. Abra o projeto em um navegador compatível com WebAuthn e teste a autenticação biométrica.

Certifique-se de seguir as melhores práticas de segurança ao implementar a autenticação biométrica em seu projeto e cumprir todas as regulamentações de privacidade de dados aplicáveis.

---
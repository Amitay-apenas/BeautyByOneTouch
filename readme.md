Perfeito. Vou compilar todas as nossas interações, desde a adição da funcionalidade de upload de imagem até a correção do erro do Render, e as organizarei no formato de um README.md. O resultado será um guia passo a passo detalhado para o seu projeto, focado nas funcionalidades que adicionamos e nas melhores práticas que implementamos.

-----

# BeautyByOneTouch

Este projeto é uma plataforma web completa para agendamento de serviços de beleza e bem-estar. A aplicação conecta clientes a profissionais, permitindo que os usuários naveguem por uma lista de estabelecimentos, visualizem detalhes de cada profissional e agendem horários disponíveis.

A arquitetura do projeto é baseada em uma aplicação de página única (SPA) construída com **React** no frontend e uma API RESTful em **Node.js** com **Express** no backend. O banco de dados utilizado é o **MongoDB**, hospedado na nuvem via **Render**.

## 🚀 Tecnologias Utilizadas

**Frontend:**

  * **React:** Biblioteca JavaScript para a interface do usuário.
  * **React Router DOM:** Para gerenciar a navegação entre as páginas.
  * **Axios:** Cliente HTTP para fazer requisições à API.
  * **Tailwind CSS:** Para estilização rápida e responsiva.

**Backend:**

  * **Node.js & Express:** Ambiente de execução e framework para o servidor web.
  * **Mongoose:** ODM (Object Data Modeling) para interagir com o MongoDB.
  * **Multer:** Middleware para lidar com o upload de arquivos (`multipart/form-data`).
  * **CORS:** Middleware para permitir requisições de diferentes origens.
  * **dotenv:** Para carregar variáveis de ambiente.

**Banco de Dados:**

  * **MongoDB:** Banco de dados NoSQL, hospedado na nuvem via **Render**.

## 📁 Estrutura do Projeto

O projeto é dividido em duas partes principais: `frontend` (a interface do usuário) e `backend` (o servidor e a API).

### 🖥️ Frontend

A pasta `frontend` contém todo o código da aplicação React, incluindo a nova página para adicionar estabelecimentos.

  * **`src/components/pages/Adicionar.jsx` (NOVO)**: Componente de formulário para adicionar novos estabelecimentos. Ele gerencia o estado dos inputs de `nome` e `endereço` e o upload da imagem, enviando os dados para o backend como `FormData` em uma requisição `POST`.

### ⚙️ Backend

A pasta `backend` contém o código do servidor Node.js e da API, agora com um novo roteador dedicado para a funcionalidade de adicionar estabelecimentos.

  * **`app.js`**: O ponto de entrada do servidor. Agora, além de rotas existentes, ele inclui o novo roteador de estabelecimentos (`/api/estabelecimentos`) e uma rota para servir arquivos estáticos (`/uploads`) que garante que as imagens salvas possam ser acessadas publicamente.
  * **`src/models/Estabelecimento.js` (NOVO)**: Define o esquema (estrutura de dados) para os estabelecimentos no MongoDB, incluindo campos para `nome`, `endereco` e o `caminho da foto`.
  * **`src/routes/estabelecimentos.js` (NOVO)**: Roteador dedicado que define as rotas da API para a funcionalidade de estabelecimentos. A rota `POST /` utiliza o `multer` para processar o upload da imagem antes de salvar os dados no banco de dados.

## 🛠️ Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo. Lembre-se de que a API agora está configurada para trabalhar com upload de arquivos e usa um novo roteador.

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Amitay-apenas/BeautyByOneTouch.git
    cd BeautyByOneTouch
    ```

2.  **Configurações do Backend (com suporte a upload de arquivos e DB no Render):**

      * Navegue até a pasta `backend`.
      * Instale as dependências **incluindo o `multer`**:
        ```bash
        npm install
        npm install multer
        ```
      * Crie uma pasta chamada `uploads` dentro da pasta `backend`. É aqui que as imagens serão salvas.
      * Crie um arquivo `.env` para armazenar a URI de conexão do seu MongoDB no Render:
        ```env
        MONGODB_URI="sua_string_de_conexao_do_render"
        ```
      * Inicie o servidor:
        ```bash
        npm run dev
        ```

3.  **Configurações do Frontend:**

      * Abra um novo terminal e navegue até a pasta `frontend`.
      * Instale as dependências:
        ```bash
        npm install
        ```
      * Inicie o servidor de desenvolvimento:
        ```bash
        npm run dev
        ```

O projeto estará disponível em `http://localhost:3000`.

## 🆕 Atualizações e Melhorias Adicionadas

Esta versão do projeto inclui melhorias significativas, especialmente na área de gerenciamento de dados e na arquitetura do backend.

  * **Funcionalidade de Adicionar Estabelecimento**: Implementamos um formulário completo que permite aos usuários inserir o nome, endereço e fazer o upload de uma foto do estabelecimento, enviando tudo para o servidor.
  * **Manipulação de Arquivos**: O backend agora usa a biblioteca **Multer** para processar o upload de imagens, salvando-as em uma pasta dedicada (`backend/uploads`) e armazenando o caminho da imagem no banco de dados.
  * **Estrutura de Rotas Modulada**: Criamos um novo roteador (`estabelecimentos.js`) para gerenciar as rotas relacionadas aos estabelecimentos. Isso mantém o código organizado e escalável.
  * **Correção de Dependência no Deploy**: O erro `Cannot find module 'multer'` que ocorria no Render foi resolvido garantindo que o `multer` fosse adicionado como uma dependência no arquivo `package.json`, assegurando sua instalação correta durante o processo de deploy.
  * **Melhoria na Conexão do Banco de Dados**: A string de conexão do MongoDB foi movida para uma variável de ambiente (`MONGODB_URI`), uma prática de segurança essencial para o deploy em ambientes como o Render.
  * **Conexão do Formulário React**: Os inputs no componente `Adicionar.jsx` agora são "controlados" pelo estado, garantindo que os dados inseridos pelo usuário sejam corretamente capturados antes do envio.
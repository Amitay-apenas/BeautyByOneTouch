# BeautyByOneTouch

Este projeto é uma plataforma web completa para agendamento de serviços de beleza e bem-estar. A aplicação conecta clientes a profissionais, permitindo que os usuários naveguem por uma lista de estabelecimentos, visualizem detalhes de cada profissional e agendem horários disponíveis.

A arquitetura do projeto é baseada em uma aplicação de página única (SPA) construída com **React** no frontend e uma API RESTful em **Node.js** com **Express** no backend. O banco de dados utilizado é o **MongoDB**.

## 🚀 Tecnologias Utilizadas

**Frontend:**

  * **React:** Biblioteca JavaScript para a interface do usuário.
  * **React Router DOM:** Para gerenciar a navegação entre as páginas.
  * **Axios:** Cliente HTTP para fazer requisições à API.
  * **Tailwind CSS:** Para estilização rápida e responsiva.

**Backend:**

  * **Node.js & Express:** Ambiente de execução e framework para o servidor web.
  * **Mongoose:** ODM (Object Data Modeling) para interagir com o MongoDB.
  * **CORS:** Middleware para permitir requisições de diferentes origens.
  * **dotenv:** Para carregar variáveis de ambiente.

**Banco de Dados:**

  * **MongoDB:** Banco de dados NoSQL.

## 📁 Estrutura do Projeto

O projeto é dividido em duas partes principais: `frontend` (a interface do usuário) e `backend` (o servidor e a API).

### 🖥️ Frontend

A pasta `frontend` contém todo o código da aplicação React.

  * **`src/App.jsx`**: O componente principal que configura o roteamento da aplicação. Ele define as rotas para a página inicial (`/`) e para a página de detalhes do profissional (`/profissional/:id`), garantindo que o cabeçalho seja exibido em todas as páginas.
  * **`src/components/pages/Home.jsx`**: A página inicial. Ela faz uma requisição `GET` para a API, busca a lista de profissionais e renderiza um componente `ObjSec` para cada um deles. O componente gerencia os estados de carregamento e erro para uma melhor experiência do usuário.
  * **`src/components/pages/ProfissionalDetalhes.jsx`**: A página de detalhes. Ela usa o `useParams` para obter o ID do profissional da URL e faz uma requisição `GET` para a API, buscando os dados específicos do profissional e seus horários disponíveis.
  * **`src/components/Header.jsx`**: Um componente reutilizável que exibe o cabeçalho da aplicação.
  * **`src/components/ObjSec.jsx`**: Um componente de cartão que exibe um resumo de cada profissional. Ele é um link que leva o usuário para a página de detalhes correspondente.

### ⚙️ Backend

A pasta `backend` contém o código do servidor Node.js e da API.

  * **`app.js`**: O ponto de entrada do servidor. Ele configura o Express, a conexão com o MongoDB, o CORS e define as rotas principais da API (`/api/profissionais` e `/api/horarios`). Ele também serve os arquivos estáticos do frontend, permitindo que a aplicação seja executada em um único serviço.
  * **`src/config/db.js`**: Contém a lógica de conexão com o banco de dados MongoDB.
  * **`src/models/Profissional.js`**: Define o esquema (estrutura de dados) para os profissionais no MongoDB.
  * **`src/models/Horario.js`**: Define o esquema para os horários de agendamento.
  * **`src/routes/profissionais.js`**: Define as rotas para a API de profissionais, chamando as funções do controlador para lidar com as requisições `GET`.
  * **`src/routes/horarios.js`**: Define a rota `POST` para agendar horários, chamando o controlador correspondente.
  * **`src/controller/profissionailController.js`**: Contém a lógica de negócio para buscar profissionais e seus horários do banco de dados.
  * **`src/controller/horarioController.js`**: Contém a lógica de negócio para agendar um horário.

## 🛠️ Instalação e Execução

Para rodar o projeto localmente, siga os passos abaixo:

1.  **Clone o repositório:**

    ```bash
    git clone https://github.com/Amitay-apenas/AmiBnB.git
    cd AmiBnB
    ```

2.  **Configure o Backend:**

      * Navegue até a pasta `backend`.
      * Instale as dependências: `npm install`.
      * Crie um arquivo `.env` com a sua string de conexão do MongoDB: `MONGO_URI="sua_string_de_conexao"`.
      * Inicie o servidor: `npm run dev` (se você tiver o nodemon) ou `node app.js`.

3.  **Configure o Frontend:**

      * Abra um novo terminal e navegue até a pasta `frontend`.
      * Instale as dependências: `npm install`.
      * Inicie o servidor de desenvolvimento: `npm run dev`.

O projeto estará disponível em `http://localhost:3000`.

-----

### Versão Atual vs. Versão Anterior (Detalhes Técnicos)

  * **Comunicação API:** A versão anterior do projeto continha URLs fixas como `http://localhost:5000` no frontend, o que causava erros `ERR_CONNECTION_REFUSED` em produção. Na versão atual, as requisições `axios` foram corrigidas para usar URLs relativas (`/api/...`), garantindo que o projeto funcione tanto localmente quanto em ambientes de deploy como o Render.

  * **Estrutura do Backend:** A arquitetura do backend foi refatorada para seguir o padrão **MVC (Model-View-Controller)**. Anteriormente, a lógica de negócio estava misturada com as rotas. Agora, as rotas (`profissionais.js`) apenas chamam funções separadas nos controladores (`profissionailController.js`), tornando o código mais limpo, modular e fácil de manter.

  * **Lógica de Rotas:** As rotas `GET` para buscar profissionais foram implementadas e corrigidas no arquivo de rotas, resolvendo o `TypeError: Cannot read properties of undefined (reading 'map')` que ocorria na página inicial. Além disso, a rota de agendamento foi separada em seu próprio arquivo.
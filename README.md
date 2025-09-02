# BeautyByOneTouch

Este projeto é uma plataforma para conectar clientes a profissionais da área da beleza, como salões de cabeleireiro, estúdios de unhas, entre outros. A aplicação permite que os profissionais adicionem seus estabelecimentos, e os usuários possam visualizá-los e contatar o profissional diretamente via WhatsApp.

## ⚙️ Setup do Projeto (Ambiente Local)

Para rodar o projeto BeautyByOneTouch em sua máquina local, você precisará configurar tanto o **backend** quanto o **frontend**.

### Pré-requisitos

  * **Node.js**: Certifique-se de que o Node.js está instalado. Você pode baixá-lo em [https://nodejs.org/](https://nodejs.org/).
  * **MongoDB**: O projeto utiliza o MongoDB como banco de dados. Você pode instalá-lo localmente ou usar um serviço de nuvem como o MongoDB Atlas.
  * **Cloudinary**: O projeto usa o Cloudinary para armazenar as imagens dos estabelecimentos. Você precisará de uma conta para obter as credenciais.

### Configuração do Backend

1.  **Navegue até a pasta `backend`**:
    ```bash
    cd backend
    ```
2.  **Instale as dependências**:
    ```bash
    npm install
    ```
3.  **Crie um arquivo `.env`**: Na raiz da pasta `backend`, crie um arquivo chamado `.env` e adicione as seguintes variáveis de ambiente, substituindo os valores pelos seus:
    ```
    MONGO_URI=sua_string_de_conexao_do_mongodb
    CLOUDINARY_CLOUD_NAME=seu_cloud_name
    CLOUDINARY_API_KEY=sua_api_key
    CLOUDINARY_API_SECRET=sua_api_secret
    ```
      * `MONGO_URI`: A string de conexão do seu banco de dados MongoDB.
      * `CLOUDINARY_*`: Credenciais da sua conta Cloudinary.
4.  **Inicie o servidor**:
    ```bash
    npm start
    ```
    O servidor será iniciado e rodará na porta padrão 5000 (a menos que configurado de outra forma).

### Configuração do Frontend

1.  **Navegue até a pasta `frontend`**:
    ```bash
    cd frontend
    ```
2.  **Instale as dependências**:
    ```bash
    npm install
    ```
3.  **Crie um arquivo `.env`**: Na raiz da pasta `frontend`, crie um arquivo chamado `.env` e adicione a seguinte variável:
    ```
    VITE_API_URL=http://localhost:5000
    ```
    Isso aponta o frontend para o backend local.
4.  **Inicie o frontend**:
    ```bash
    npm run dev
    ```
    O aplicativo será aberto no seu navegador padrão, geralmente em `http://localhost:5173`.

-----

## 💻 Backend: Análise Detalhada

O backend é uma API RESTful construída com **Node.js, Express.js** e **MongoDB**. Ele gerencia a persistência dos dados dos estabelecimentos.

### Estrutura de Arquivos

  * `backend/`: Pasta raiz do backend.
      * `db.js`: Contém a lógica de conexão com o MongoDB.
      * `estabelecimentos.js`: Define o esquema do Mongoose para os estabelecimentos.
      * `estabelecimentoController.js`: Lógica de controle para buscar estabelecimentos.
      * `estabelecimentos.js`: Define as rotas para os endpoints de estabelecimentos.

### Análise dos Arquivos

#### `backend/db.js`

Este arquivo é responsável por estabelecer a conexão com o banco de dados MongoDB usando a biblioteca Mongoose.

```javascript
const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // Conecta ao MongoDB usando a URI do arquivo .env
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true, // Usa o novo parser de URL
            useUnifiedTopology: true, // Usa a nova engine de gerenciamento de topologia
        });
        // Loga no console se a conexão for bem-sucedida, mostrando o host.
        console.log(`Conexão com MongoDB bem sucedida ${conn.connection.host}`)
    } catch (err) {
        // Captura e loga erros, e encerra o processo do Node.js em caso de falha.
        console.log(`Erro ao conectar com o banco de dados: ${err.message}`);
        process.exit(1);
    }
};

module.exports = connectDB;
```

  * **`mongoose = require('mongoose')`**: Importa a biblioteca Mongoose.
  * **`connectDB`**: Uma função assíncrona que tenta conectar ao banco de dados.
  * **`mongoose.connect(process.env.MONGO_URI, { ... })`**: Tenta conectar usando a string de conexão da variável de ambiente `MONGO_URI`. As opções `useNewUrlParser` e `useUnifiedTopology` são usadas para evitar avisos de depreciação.
  * **`console.log(...)`**: Exibe uma mensagem de sucesso ou erro no console.
  * **`process.exit(1)`**: Encerra o aplicativo com um código de erro se a conexão falhar.
  * **`module.exports = connectDB`**: Exporta a função para que ela possa ser usada no arquivo principal do servidor.

-----

#### `backend/models/Estabelecimento.js`

Este arquivo define o modelo de dados para um estabelecimento, que é a estrutura dos documentos que serão armazenados no MongoDB.

```javascript
const mongoose = require('mongoose');

// Define o esquema (schema) do Mongoose para um estabelecimento
const estabelecimentoSchema = new mongoose.Schema({
  nome: {
    type: String, // Tipo de dado: String
    required: true, // O campo é obrigatório
    trim: true, // Remove espaços em branco do início e do fim
  },
  endereco: {
    type: String,
    required: true,
    trim: true,
  },
  numero: {
    type: String,
    required: true,
    trim: true,
  },
  foto: {
    type: String,
    required: false, // O campo não é obrigatório
  },
}, {
  timestamps: true, // Adiciona campos `createdAt` e `updatedAt` automaticamente
});

// Cria e exporta o modelo 'Estabelecimento'
module.exports = mongoose.model('Estabelecimento', estabelecimentoSchema);
```

  * **`new mongoose.Schema(...)`**: Cria um novo esquema.
  * **`nome`, `endereco`, `numero`, `foto`**: Definem os campos do documento. Cada um tem um `type` e um booleano `required`. O campo `foto` não é obrigatório (`required: false`).
  * **`trim: true`**: Garante que os dados de `nome`, `endereco` e `numero` não contenham espaços em branco indesejados.
  * **`timestamps: true`**: Uma opção do Mongoose que automaticamente adiciona e gerencia os campos `createdAt` e `updatedAt` nos documentos.
  * **`module.exports = mongoose.model(...)`**: Compila o esquema em um modelo e o exporta. O modelo é a interface para interagir com o banco de dados.

-----

#### `backend/routes/estabelecimentos.js`

Este arquivo define as rotas da API para os endpoints de estabelecimentos. Ele lida com o upload de imagens e as operações de criação e listagem de estabelecimentos.

```javascript
const path = require('path');
const express = require('express');
const router = express.Router();
const Estabelecimento = require('../models/Estabelecimento');

// Importação de bibliotecas para upload de arquivos
const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

// Configura o Cloudinary com as credenciais do .env
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configuração de armazenamento para o Multer-Cloudinary
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'beautybyonetouch', // Pasta onde as imagens serão salvas no Cloudinary
    format: async (req, file) => 'jpeg', // Força o formato para jpeg
    public_id: (req, file) => file.originalname + '-' + Date.now(), // Gera um ID único
  },
});

const upload = multer({ storage: storage });

// Rota POST para adicionar um novo estabelecimento
router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { nome, endereco, numero } = req.body;
    
    // Obtém o URL da imagem do Cloudinary se um arquivo foi enviado
    const foto = req.file ? req.file.path : null;

    // Cria uma nova instância do modelo Estabelecimento
    const novoEstabelecimento = new Estabelecimento({
      nome,
      endereco,
      numero,
      foto,
    });

    // Salva o novo estabelecimento no banco de dados
    await novoEstabelecimento.save();
    res.status(201).json({ 
      message: 'Estabelecimento adicionado com sucesso!', 
      data: novoEstabelecimento 
    });
  } catch (error) {
    console.error("Erro ao adicionar estabelecimento:", error);
    res.status(500).json({ error: 'Erro ao adicionar estabelecimento.' });
  }
});

// Rota GET para listar todos os estabelecimentos
router.get('/', async (req, res) => {
  try {
    // Busca todos os documentos da coleção Estabelecimento
    const estabelecimentos = await Estabelecimento.find();
    res.status(200).json(estabelecimentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estabelecimentos.' });
  }
});

module.exports = router;
```

  * **`express.Router()`**: Cria um novo objeto `Router` para gerenciar as rotas.
  * **`multer` & `cloudinary`**: Bibliotecas para upload de arquivos. `multer` é um middleware do Express para tratar `multipart/form-data`, e `cloudinary` é a API para interagir com o serviço de armazenamento de imagens.
  * **`cloudinary.config(...)`**: Configura o Cloudinary com as credenciais.
  * **`CloudinaryStorage`**: Configura o `multer` para usar o Cloudinary como destino do armazenamento.
  * **`upload.single('foto')`**: Middleware que processa um único arquivo com o nome de campo `foto`. A imagem é enviada para o Cloudinary antes que a lógica da rota seja executada.
  * **`router.post('/')`**: Rota que lida com requisições HTTP `POST` para criar um novo estabelecimento. Ela recebe os dados do formulário e o arquivo de imagem.
  * **`router.get('/')`**: Rota que lida com requisições HTTP `GET` para buscar e retornar todos os estabelecimentos do banco de dados.

-----

#### `backend/controllers/estabelecimentoController.js`

Este arquivo contém a lógica de negócios para as rotas de estabelecimentos.

```javascript
const Estabelecimento = require('../models/Estabelecimento');
const Horario = require('../models/Horario');

// Exporta a função para obter todos os estabelecimentos
exports.getEstabelecimento = async (req, res) => {
  try {
    const estabelecimento = await Estabelecimento.find({});
    // Retorna a lista de estabelecimentos e o número de documentos encontrados
    res.status(200).json({
      success: true,
      count: estabelecimento.length,
      data: estabelecimento,
    });
  } catch (err) {
    // Retorna um erro 500 em caso de falha no servidor
    res.status(500).json({ success: false, error: 'Erro no servidor' });
  }
};

// Exporta a função para obter um estabelecimento pelo ID
exports.getEstabelecimentoById = async (req, res) => {
  try {
    // Busca o estabelecimento usando o ID da URL
    const estabelecimento = await Estabelecimento.findById(req.params.id);

    // Se o estabelecimento não for encontrado, retorna 404
    if (!estabelecimento) {
      return res.status(404).json({ success: false, error: 'Estabelecimento não encontrado' });
    }

    // Busca horários associados a este profissional
    const horarios = await Horario.find({ profissional: req.params.id });

    // Retorna os detalhes do estabelecimento e seus horários
    res.status(200).json({
      success: true,
      data: {
        profissional: estabelecimento, // Nota: o nome da variável aqui é 'profissional', não 'estabelecimento'.
        horarios,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erro no servidor' });
  }
};
```

  * **`exports.getEstabelecimento`**: Função que busca todos os estabelecimentos na coleção `Estabelecimento` e os retorna em uma resposta JSON.
  * **`exports.getEstabelecimentoById`**: Função que busca um estabelecimento específico usando o `ID` fornecido na URL. Ele também busca os horários associados a esse ID (assumindo que existe um modelo `Horario` e uma relação).

-----

## 🎨 Frontend: Análise Detalhada

O frontend é um aplicativo **React** construído com **Vite**, que consome a API do backend para exibir e adicionar estabelecimentos. Ele utiliza `react-router-dom` para navegação e **Tailwind CSS** para estilização.

### Análise dos Arquivos

#### `frontend/src/main.jsx`

Este é o ponto de entrada principal da aplicação React.

```javascript
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// Cria a raiz do aplicativo e renderiza o componente App
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
```

  * **`createRoot(document.getElementById('root'))`**: Pega o elemento `div` com o ID `root` no `index.html` e cria uma raiz para a aplicação React.
  * **`<StrictMode>`**: Um componente do React que ajuda a encontrar potenciais problemas na aplicação. Ele ativa checagens extras durante o desenvolvimento.
  * **`<App />`**: O componente principal da aplicação, que encapsula todo o resto.

-----

#### `frontend/src/App.jsx`

O componente principal que configura o roteamento da aplicação.

```javascript
import Home from './components/pages/Home';
import Header from './components/Header';
import EstabelecimentoDetalhes from './components/pages/EstabelecimentoDetalhes';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Adicionar from './components/pages/Adicionar';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/estabelecimento/:id' element={<EstabelecimentoDetalhes />} />
          <Route path='/adicionar' element={<Adicionar/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
```

  * **`import`**: Importa os componentes de página e o `Header` para uso nas rotas.
  * **`<BrowserRouter>`**: O roteador principal que mantém a interface do usuário sincronizada com a URL.
  * **`<Header />`**: O componente de cabeçalho que é renderizado em todas as páginas.
  * **`<Routes>`**: Um contêiner que agrupa todas as rotas.
  * **`<Route>`**: Define uma rota específica:
      * `path='/'`: Mostra o componente `<Home />` na página inicial.
      * `path='/estabelecimento/:id'`: Mostra `<EstabelecimentoDetalhes />` para URLs como `/estabelecimento/123`. `:id` é um parâmetro dinâmico.
      * `path='/adicionar'`: Mostra `<Adicionar />` na página para adicionar novos estabelecimentos.

-----

#### `frontend/src/components/Header.jsx`

Este componente representa o cabeçalho da aplicação.

```javascript
import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <>
      <div className=" sticky top-0 flex border-b-1 border-b-white py-4 px-5 max-w-full items-center justify-between bg-white/10 backdrop-blur-sm hover:bg-pink-300 hover:text-white transition delay-150 duration-300 ease-in-out">
        <h1 className="font-Fleu text-2xl cursor-default sm:text-4xl">BeautyByOneTouch</h1>
        <Link
          to="/adicionar"
          className="border-1 font-light border-white p-2.5 rounded-full cursor-pointer hover:scale-110 transition delay-150 duration-300 ease-in-out text-xs sm:text-base"
        >
          Adicionar meu trabalho
        </Link>
      </div>
    </>
  );
};

export default Header;
```

  * **`<Link to="/adicionar">`**: Componente do `react-router-dom` para navegação. Ele cria um link que, quando clicado, leva o usuário para a rota `/adicionar` sem recarregar a página.
  * **Classes CSS**: As classes como `bg-white/10`, `backdrop-blur-sm` e `hover:bg-pink-300` são do **Tailwind CSS**, usadas para estilização.

-----

#### `frontend/src/components/ObjSec.jsx`

Um componente de cartão (card) para exibir um estabelecimento na página inicial.

```javascript
import React from "react";
import { Link } from "react-router-dom";

const ObjSec = ({ estabelecimento }) => {
  if (!estabelecimento) {
    return null;
  }

  const estabNumero = estabelecimento.numero
  // Remove caracteres não numéricos do número do WhatsApp
  const numeroLimpo = estabNumero.replaceAll(' ', '').replaceAll('-', '').replaceAll('+', '').replaceAll('(', '').replaceAll(')', '')

  return (
    // O link agora leva para a conversa do WhatsApp
    <a href={`https://wa.me/${numeroLimpo}`} className="max-w-full">
      <div className="bg-white rounded-md px-2 py-2 max-w-2xs">
        <img src={estabelecimento.foto} alt={estabelecimento.nome} className="rounded-md" />
        <div>
          <p>{estabelecimento.nome}</p>
        </div>
        <div>
          <p className="truncate">
            {estabelecimento.endereco}
          </p>
        </div>
        <div>
          <p>
            {estabelecimento.numero}
          </p>
        </div>
      </div>
    </a>
  );
};

export default ObjSec;
```

  * **`({ estabelecimento })`**: O componente recebe um objeto `estabelecimento` como propriedade.
  * **`numeroLimpo = estabNumero.replaceAll(...)`**: Lógica para limpar a string do número de telefone, removendo espaços, hífens e parênteses.
  * **`<a href={`[https://wa.me/$](https://wa.me/$){numeroLimpo}`}>`**: Cria um link que, ao ser clicado, abre uma conversa no WhatsApp para o número limpo.
  * **`<img src={estabelecimento.foto} ... />`**: Exibe a foto do estabelecimento usando o URL fornecido pela API.
  * **`{estabelecimento.nome}`**, **`{estabelecimento.endereco}`**, **`{estabelecimento.numero}`**: Exibe as informações do estabelecimento.

-----

#### `frontend/src/components/pages/Home.jsx`

A página principal que lista todos os estabelecimentos.

```javascript
import React, { useEffect, useState } from "react";
import ObjSec from "../ObjSec";

function Home() {
  // Estados para gerenciar os dados, carregamento e erros
  const [estabelecimentos, setEstabelecimentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Hook para buscar os dados quando o componente é montado
  useEffect(() => {
    const fetchEstabelecimentos = async () => {
      try {
        const response = await fetch("/api/estabelecimentos");
        if (!response.ok) {
          throw new Error("Falha ao buscar estabelecimentos");
        }
        const data = await response.json();
        setEstabelecimentos(data);
        setError(null);
      } catch (err) {
        console.error("Erro ao buscar dados:", err);
        setError("Não foi possível carregar os estabelecimentos. Tente novamente mais tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchEstabelecimentos();
  }, []); // O array vazio assegura que o efeito rode apenas uma vez

  // Lógica de renderização condicional
  if (loading) {
    return <div>Carregando...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div className="home-page-container mx-auto grid max-w-3xl grid-cols-[repeat(auto-fit,minmax(225px,1fr))] gap-8 px-8 py-4">
      {estabelecimentos.length > 0 ? (
        estabelecimentos.map((estabelecimento) => (
          <ObjSec 
            key={estabelecimento._id}
            estabelecimento={{
              _id: estabelecimento._id,
              nome: estabelecimento.nome,
              endereco: estabelecimento.endereco,
              numero: estabelecimento.numero,
              foto: estabelecimento.foto,
            }}
          />
        ))
      ) : (
        <div>Nenhum estabelecimento encontrado.</div>
      )}
    </div>
  );
}

export default Home;
```

  * **`useState`**: Hooks do React para gerenciar o estado da aplicação.
  * **`useEffect`**: Hook que executa a função de busca de dados apenas uma vez quando o componente é montado.
  * **`fetch("/api/estabelecimentos")`**: Faz uma requisição HTTP para a API do backend para buscar a lista de estabelecimentos.
  * **`if (loading)`...**: A página exibe "Carregando..." enquanto os dados estão sendo buscados.
  * **`estabelecimentos.length > 0 ? (...) : (...)`**: Renderização condicional. Se houver estabelecimentos, ele mapeia o array e renderiza um componente `<ObjSec />` para cada um. Caso contrário, exibe uma mensagem de "Nenhum estabelecimento encontrado".

-----

#### `frontend/src/components/pages/Adicionar.jsx`

Uma página que contém um formulário para que novos profissionais adicionem seus estabelecimentos.

```javascript
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Adicionar() {
  // Estados para os inputs do formulário
  const [selectedImg, setSelectedImg] = useState(null);
  const [nome, setNome] = useState(null);
  const [endereco, setEndereco] = useState(null);
  const [numero, setNumero] = useState(null);
  const navigate = useNavigate(); // Hook para navegação programática

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("nome", nome);
    formData.append("endereco", endereco);
    formData.append("numero", numero);
    if (selectedImg) {
      formData.append("foto", selectedImg);
    }

    try {
      // Faz a requisição POST para a API com os dados do formulário
      const response = await fetch(
        "https://beautybyonetouch.onrender.com/api/estabelecimentos",
        {
          method: "POST",
          body: formData, // Envia o FormData
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log("Dados enviados com sucesso!", data);
        navigate("/"); // Navega de volta para a página inicial
      } else {
        throw new Error("Falha no envio do formulário");
      }
    } catch (error) {
      console.error("Erro ao enviar dados:", error);
    }
  };

  return (
    <>
      <div className="justify-self-center items-center my-10 bg-white rounded-4xl p-4 text-xs max-w-80 sm:text-base flex flex-col sm:max-w-md">
        <h1 className="text-2xl font-light py-4 sm:text3xl">
          Adicionar meu trabalho
        </h1>
        <input
          className="border-b-2 border-b-pink-300 w-full my-2 focus:outline-none"
          type="text"
          placeholder="Nome do seu estabelecimento"
          onChange={(e) => setNome(e.target.value)}
        />
        <input
          className="border-b-2 border-b-pink-300 w-full my-2 focus:outline-none"
          type="text"
          placeholder="Endereço"
          onChange={(e) => setEndereco(e.target.value)}
        />
        <input 
          className="border-b-2 border-b-pink-300 w-full my-2 focus:outline-none"
          type="text"
          placeholder="numero do whatsapp"
          onChange={(e) => setNumero(e.target.value)} 
        />
        <input
          className="border-2 rounded-full border-pink-300 p-2 my-2 focus:outline-none hover:bg-pink-300 hover:text-white hover:-translate-y-1 cursor-pointer transition delay-150 duration-300 ease-in-out"
          type="file"
          onChange={(event) => {
            console.log(event.target.files[0]);
            setSelectedImg(event.target.files[0]);
          }}
        />
        {selectedImg && (
          <div className="max-w-60">
            <img src={URL.createObjectURL(selectedImg)} alt="not found" />
            <button
              className="border-2 rounded-full border-pink-300 p-2 my-2 focus:outline-none hover:bg-pink-300 hover:text-white hover:-translate-y-1 cursor-pointer transition delay-150 duration-300 ease-in-out"
              onClick={() => setSelectedImg(null)}
            >
              remove
            </button>
          </div>
        )}
        <button className="border-2 rounded-full border-pink-300 px-5 py-2 my-2 focus:outline-none hover:bg-pink-300 hover:text-white hover:-translate-y-1 cursor-pointer transition delay-150 duration-300 ease-in-out"
        onClick={handleSubmit}
        >
          Enviar
        </button>
      </div>
    </>
  );
}

export default Adicionar;
```

  * **`useState`**: Gerencia o estado de cada campo do formulário (`nome`, `endereco`, `numero`) e a imagem selecionada.
  * **`useNavigate`**: Hook para redirecionar o usuário para outra página após o envio do formulário.
  * **`FormData`**: Um objeto que permite construir dados de formulário chave-valor para envio via `fetch`. É ideal para enviar arquivos.
  * **`handleSubmit`**: Uma função assíncrona que é chamada quando o botão "Enviar" é clicado. Ela constrói o `FormData` e faz uma requisição `POST` para a API.
  * **`URL.createObjectURL(selectedImg)`**: Cria um URL temporário para exibir a imagem selecionada no navegador antes de ser enviada.
  * **`Maps('/')`**: Redireciona o usuário para a página inicial após o envio bem-sucedido.

# Projeto BeautyByOneTouch

Este projeto é uma aplicação web que visa conectar clientes a profissionais de beleza e bem-estar. A arquitetura é baseada em React no frontend, comunicando-se com uma API de backend para buscar e exibir os dados dos estabelecimentos.

## Estrutura do Projeto

O projeto segue uma estrutura de componentes e páginas bem definida para organização e escalabilidade. Abaixo está a descrição detalhada de cada arquivo e a sua função.

### Frontend

A pasta `frontend` contém o código-fonte da interface do usuário.

#### `src/App.jsx`
Este arquivo é o componente principal da aplicação.

* `import React from 'react';`: Importa a biblioteca React.
* `import Home from './components/pages/Home';`: Importa o componente da página inicial.
* `import Header from './components/Header';`: Importa o componente do cabeçalho.
* `import {BrowserRouter, Routes, Route} from 'react-router-dom';`: Importa os componentes necessários para o roteamento, permitindo a navegação entre as páginas sem recarregar a aplicação.
* `const App = () => { ... };`: Define o componente funcional principal.
* `<BrowserRouter>`: Envolve toda a aplicação para habilitar o roteamento.
* `<Header />`: Renderiza o cabeçalho, que será exibido em todas as páginas.
* `<Routes>`: Um contêiner para definir as rotas da aplicação.
* `<Route path='/' element={ <Home />} />`: Define a rota para a URL base (`/`), que renderiza o componente `Home`.
* `export default App`: Exporta o componente `App` para ser usado em `main.jsx`.

#### `src/components/pages/Home.jsx`
Este é o componente da página inicial que exibe a grade de estabelecimentos.

* `import React, { useState, useEffect } from 'react';`: Importa os hooks `useState` (para gerenciar o estado dos dados) e `useEffect` (para lidar com efeitos colaterais, como a busca de dados).
* `import axios from 'axios';`: Importa a biblioteca `axios` para fazer requisições HTTP para a API.
* `import Obj from '../ObjSec';`: Importa o componente `Obj` (renomeado como `ObjSec` em sua implementação final) que renderiza um único item da grade.
* `const Home = () => { ... };`: Define o componente da página.
* `const [profissionais, setProfissionais] = useState([]);`: Cria um estado para armazenar a lista de profissionais.
* `const [loading, setLoading] = useState(true);`: Cria um estado para indicar que os dados estão sendo carregados.
* `const [error, setError] = useState(null);`: Cria um estado para lidar com possíveis erros na requisição.
* `useEffect(() => { ... });`: Hook que executa a função de busca de dados apenas uma vez, quando o componente é montado.
* `const fetchProfissionais = async () => { ... };`: Função assíncrona para buscar os dados dos profissionais na API.
* `const response = await axios.get('http://localhost:5000/api/profissionais');`: Faz uma requisição GET para a API.
* `setProfissionais(response.data.data);`: Atualiza o estado com os dados recebidos da API.
* `if (loading) { ... }`: Exibe uma mensagem de "Carregando..." enquanto os dados não chegam.
* `if (error) { ... }`: Exibe uma mensagem de erro se a requisição falhar.
* `<section className='grid grid-cols-4 max-w-full gap-8'>`: Define o contêiner da grade com o layout de 4 colunas.
* `profissionais.map(profissional => (...));`: Mapeia a lista de profissionais e renderiza um componente `ObjSec` para cada um, passando os dados como `props`.
* `export default Home`: Exporta o componente `Home`.

#### `src/components/Header.jsx`
Este é o componente do cabeçalho da aplicação.

* `import React from "react";`: Importa a biblioteca React.
* `const Header = () => { ... };`: Define o componente funcional.
* `<div className="...">`: Contém o layout do cabeçalho, estilizado com Tailwind CSS.
* `<h1 className="...">`: Exibe o nome do projeto.
* `export default Header`: Exporta o componente `Header`.

#### `src/components/ObjSec.jsx`
Este componente representa um único item na grade de estabelecimentos.

* `import React from "react";`: Importa a biblioteca React.
* `import { Link } from "react-router-dom";`: Importa o componente `Link` para criar um link de navegação.
* `const ObjSec = ({ profissional }) => { ... };`: Define o componente, recebendo um objeto `profissional` como `prop`.
* `if (!profissional) { ... }`: Verifica se a prop foi passada para evitar erros.
* `<Link to={`/profissional/${profissional._id}`} className="max-w-full">`: Cria um link para a página de detalhes de um profissional específico usando o ID.
* `<div className="...">`: Contém o layout e estilo do card do estabelecimento.
* `<img src={profissional.fotoUrl} ... />`: Exibe a imagem do estabelecimento, usando a URL recebida da API.
* `<div><p>{profissional.nomeDoLugar}</p></div>`: Exibe o nome do estabelecimento.
* `<div><p className="truncate">{profissional.descricao}</p></div>`: Exibe a descrição do estabelecimento, com a classe `truncate` para cortar o texto longo.
* `export default ObjSec`: Exporta o componente `ObjSec`.
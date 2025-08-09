const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');

// Carrega as variáveis de ambiente
dotenv.config({ path: './backend/.env' });

// Conecta ao banco de dados
connectDB();

const app = express();

// Configura o middleware para processar JSON e CORS
app.use(express.json());
app.use(cors());

// Importa o roteador de profissionais
const profissionaisRouter = require('./src/routes/profissionais.js');

// 1. ROTAS DA API - Defina todas as rotas da sua API primeiro
app.use('/api/profissionais', profissionaisRouter);

// 2. ARQUIVOS ESTÁTICOS - Sirva os arquivos estáticos do frontend (CSS, JS, imagens, etc.)
// O caminho '__dirname, '..', 'frontend', 'dist'' aponta para a pasta build do seu frontend
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// 3. ROTA CATCH-ALL - Redireciona todas as outras requisições para o index.html do frontend
// Essa rota deve ser a ÚLTIMA, para que a API e os arquivos estáticos sejam priorizados.
app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
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
const horariosRouter = require('./src/routes/horarios.js');

app.use('/api/profissionais', profissionaisRouter);
app.use('/api/horarios', horariosRouter);

app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
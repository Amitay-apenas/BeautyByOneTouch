// backend/app.js

const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');

dotenv.config({ path: './backend/.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

// Rota da sua API
app.use('/api/profissionais', require('./src/routes/profissionais'));

// Configuração para servir o frontend
// -----------------------------------------------------------------
// Define a pasta estática que irá servir os arquivos do frontend
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Para qualquer outra rota, redireciona para o arquivo index.html do frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});
// -----------------------------------------------------------------

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
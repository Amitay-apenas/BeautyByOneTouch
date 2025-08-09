const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');

dotenv.config({ path: './.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(cors());
const path = require('path');

// Serve os arquivos estáticos da pasta 'dist' dentro de 'frontend'
app.use(express.static(path.join(__dirname, 'frontend', 'dist')));

// Redireciona todas as outras requisições para o index.html
// Isso é essencial para que o roteamento do seu frontend funcione
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
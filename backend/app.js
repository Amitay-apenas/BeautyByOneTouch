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

// Serve os arquivos estáticos do frontend (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// 1. Defina as rotas da sua API aqui
const profissionaisRouter = require('./src/routes/profissionais.js');
app.use('/api/profissionais', profissionaisRouter);

// 2. Para qualquer outra rota que não seja da API, redirecione para o index.html
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
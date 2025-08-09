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

const profissionaisRouter = require('./src/routes/profissionais.js');

// 1. Defina as rotas da sua API primeiro
app.use('/api/profissionais', profissionaisRouter);

// 2. Sirva os arquivos estáticos do frontend
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// 3. Defina a rota "catch-all" por último
// Ela serve o index.html para todas as outras requisições
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
// });

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
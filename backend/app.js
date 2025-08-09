const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');

dotenv.config({ path: './backend/.env' });

connectDB();

const app = express();

// Comente todas essas linhas
app.use(express.json());
app.use(cors());

const profissionaisRouter = require('./src/routes/profissionais.js');
app.use('/api/profissionais', profissionaisRouter);

// Serve os arquivos estáticos do frontend (CSS, JS, etc.)
app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

// Para qualquer outra rota que não seja da API, redirecione para o index.html
app.use((req, res) => {
    res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});
const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
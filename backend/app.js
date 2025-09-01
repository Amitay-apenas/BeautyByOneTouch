const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./src/config/db');
const estabelecimentosRouter = require('./src/routes/estabelecimentos.js');

dotenv.config({ path: './backend/.env' });

connectDB();

const app = express();

app.use(express.json());
app.use(cors());

const profissionaisRouter = require('./src/routes/profissionais.js');
const horariosRouter = require('./src/routes/horarios.js');

app.use('/api/profissionais', profissionaisRouter);
app.use('/api/horarios', horariosRouter);

app.use('/api/estabelecimentos', estabelecimentosRouter);

app.use('/uploads', express.static('backend/uploads'));

app.use(express.static(path.join(__dirname, '..', 'frontend', 'dist')));

app.use((req, res) => {
  res.sendFile(path.join(__dirname, '..', 'frontend', 'dist', 'index.html'));
});

const PORT = process.env.PORT || 10000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./src/config/db');
const path = require('path');

dotenv.config({ path: './.env' });

connectDB();

const app = express();

app.use(express.static(path.join(__dirname, 'dist')));
app.use(express.json());
app.use(cors());

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.use('/api/profissionais', require('./src/routes/profissionais'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
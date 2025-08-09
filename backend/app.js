const dotenv = require('dotenv');
dotenv.config({ path: './backend/.env' });

const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');


connectDB();

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/profissionais', require('./src/routes/profissionais'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
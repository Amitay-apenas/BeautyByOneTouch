const express = require('express');
const router = express.Router();
const { getProfissionais, getProfissionalById } = require('../controller/profissionailController');

// Rota GET para listar todos os profissionais
router.get('/', getProfissionais);

// Rota GET para buscar um profissional por ID
router.get('/:id', getProfissionalById);

module.exports = router;
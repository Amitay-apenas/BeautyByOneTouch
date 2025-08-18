const express = require('express');
const router = express.Router();
const { getProfissionais, getProfissionalById } = require('../controller/profissionalController.js');

// Rota GET para listar todos os profissionais
router.get('/', getProfissionais);

// Rota GET para buscar um profissional por ID
router.get('/:id', getProfissionalById);

module.exports = router;
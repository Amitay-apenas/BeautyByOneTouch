const express = require('express');
const router = express.Router();
const { getProfissionais, getProfissionalById } = require('../controller/profissionalController');

router.get('/', getProfissionais);

router.get('/:id', getProfissionalById);

module.exports = router;
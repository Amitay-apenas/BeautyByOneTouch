// backend/src/routes/profissionais.js

const express = require('express');
const router = express.Router();
const Profissional = require('../models/Profissional');
const { body, validationResult } = require('express-validator');

// Defina a rota POST com um array de middlewares antes do handler da rota
router.post(
  '/',
  [
    // Array de middlewares de validação
    body('nome').notEmpty().withMessage('O nome é obrigatório'),
    body('email').isEmail().withMessage('Email inválido'),
    body('telefone').notEmpty().withMessage('O telefone é obrigatório'),
    body('especialidade').notEmpty().withMessage('A especialidade é obrigatória'),
  ],
  async (req, res) => {
    // Verifique por erros de validação
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nome, email, telefone, especialidade } = req.body;
      const novoProfissional = new Profissional({
        nome,
        email,
        telefone,
        especialidade,
      });

      const profissionalSalvo = await novoProfissional.save();
      res.status(201).json(profissionalSalvo);
    } catch (error) {
      console.error('Erro ao adicionar profissional:', error);
      res.status(500).send('Erro no servidor');
    }
  }
);

module.exports = router;
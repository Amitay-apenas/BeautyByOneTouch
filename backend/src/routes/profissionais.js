const express = require('express');
const router = express.Router();
const Profissional = require('../models/Profissional');
const { body, validationResult } = require('express-validator');

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

router.get('/', async (req, res) => {
  try {
    const profissionais = await Profissional.find();
    res.json({ success: true, data: profissionais });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar profissionais' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const profissional = await Profissional.findById(req.params.id);

    if (!profissional) {
      return res.status(404).json({ success: false, message: 'Profissional não encontrado' });
    }

    res.json({ success: true, data: profissional });
  } catch (err) {
    res.status(500).json({ success: false, message: 'Erro ao buscar profissional' });
  }
});


module.exports = router;

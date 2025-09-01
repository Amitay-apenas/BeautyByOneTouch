const express = require('express');
const router = express.Router();
const multer = require('multer');
const Estabelecimento = require('../models/Estabelecimento');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'backend/uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.post('/', upload.single('foto'), async (req, res) => {
  try {
    const { nome, endereco } = req.body;
    const foto = req.file ? req.file.path : null;

    const novoEstabelecimento = new Estabelecimento({
      nome,
      endereco,
      foto,
    });

    await novoEstabelecimento.save();
    res.status(201).json({ 
        message: 'Estabelecimento adicionado com sucesso!', 
        data: novoEstabelecimento 
    });
  } catch (error) {
    res.status(500).json({ error: 'Erro ao adicionar estabelecimento.' });
  }
});

module.exports = router;
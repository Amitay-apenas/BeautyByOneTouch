const path = require('path');
const express = require('express');
const router = express.Router();
const Estabelecimento = require('../models/Estabelecimento');

const multer = require('multer');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'beautybyonetouch',
    format: async (req, file) => 'jpeg', 
    public_id: (req, file) => file.originalname + '-' + Date.now(), 
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
    console.error("Erro ao adicionar estabelecimento:", error);
    res.status(500).json({ error: 'Erro ao adicionar estabelecimento.' });
  }
});

router.get('/', async (req, res) => {
  try {
    const estabelecimentos = await Estabelecimento.find();
    res.status(200).json(estabelecimentos);
  } catch (error) {
    res.status(500).json({ error: 'Erro ao buscar estabelecimentos.' });
  }
});

module.exports = router;
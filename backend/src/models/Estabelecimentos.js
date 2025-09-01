const mongoose = require('mongoose');

const estabelecimentoSchema = new mongoose.Schema({
  nome: {
    type: String,
    required: true,
    trim: true,
  },
  endereco: {
    type: String,
    required: true,
    trim: true,
  },
  foto: {
    type: String,
    required: false,
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Estabelecimento', estabelecimentoSchema);
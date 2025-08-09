const mongoose = require('mongoose');

const ProfissionalSchema = new mongoose.Schema({
  nomeDoLugar: {
    type: String,
    required: [true, 'O nome do lugar é obrigatório'],
  },
  descricao: {
    type: String,
    required: [true, 'A descrição é obrigatória'],
  },
  fotoUrl: {
    type: String,
    required: [true, 'A URL da foto é obrigatória'],
  },
  telefone: {
    type: String,
    required: [true, 'O telefone é obrigatório'],
  }
});

module.exports = mongoose.model('Profissional', ProfissionalSchema);
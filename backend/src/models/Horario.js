const mongoose = require("mongoose");

const HorarioSchema = new mongoose.Schema({
  profissional: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Profissional",
    required: true,
  },
  data: {
    type: Date,
    required: true,
  },
  horariosDisponiveis: {
    type: [String],
    required: true,
  },
  agendadoPor: {
    nome: {
      type: String,
      default: null,
    },
    telefone: {
      type: String,
      default: null,
    },
  },
});

module.exports = mongoose.model("Horario", HorarioSchema);

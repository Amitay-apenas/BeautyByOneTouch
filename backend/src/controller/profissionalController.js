const Profissional = require('../models/Profissional');
const Horario = require('../models/Horario');

exports.getProfissionais = async (req, res) => {
  try {
    const profissionais = await Profissional.find({});
    res.status(200).json({
      success: true,
      count: profissionais.length,
      data: profissionais,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erro no servidor' });
  }
};

exports.getProfissionalById = async (req, res) => {
  try {
    const profissional = await Profissional.findById(req.params.id);

    if (!profissional) {
      return res.status(404).json({ success: false, error: 'Profissional não encontrado' });
    }

    const horarios = await Horario.find({ profissional: req.params.id });

    res.status(200).json({
      success: true,
      data: {
        profissional,
        horarios,
      },
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erro no servidor' });
  }
};
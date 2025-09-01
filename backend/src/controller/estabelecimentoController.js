const Estabelecimento = require('../models/Estabelecimento');
const Horario = require('../models/Horario');

exports.getEstabelecimento = async (req, res) => {
  try {
    const estabelecimento = await Estabelecimento.find({});
    res.status(200).json({
      success: true,
      count: estabelecimento.length,
      data: estabelecimento,
    });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erro no servidor' });
  }
};

exports.getEstabelecimentoById = async (req, res) => {
  try {
    const estabelecimento = await Estabelecimento.findById(req.params.id);

    if (!profissional) {
      return res.status(404).json({ success: false, error: 'Estabelecimento não encontrado' });
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
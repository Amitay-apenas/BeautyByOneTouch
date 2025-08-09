const Horario = require('../models/Horario');

exports.agendarHorario = async (req, res) => {
  const { horarioId, nomeCliente, telefoneCliente } = req.body;

  try {
    const horario = await Horario.findById(horarioId);

    if (!horario) {
      return res.status(404).json({ success: false, error: 'Horário não encontrado' });
    }

    if (horario.agendadoPor.nome !== null) {
      return res.status(400).json({ success: false, error: 'Este horário já está agendado' });
    }

    horario.agendadoPor.nome = nomeCliente;
    horario.agendadoPor.telefone = telefoneCliente;

    await horario.save();

    res.status(200).json({ success: true, data: horario });
  } catch (err) {
    res.status(500).json({ success: false, error: 'Erro no servidor' });
  }
};
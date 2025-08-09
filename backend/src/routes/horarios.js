const express = require('express');
const router = express.Router();
const { agendarHorario } = require('../controller/horarioController');

router.post('/agendar', agendarHorario);

module.exports = router;
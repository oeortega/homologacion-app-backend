const express = require('express');
const router = express.Router();
const homologacionController = require('../controllers/homologacionController');

router.post('/homologacion/calcular', homologacionController.calcularHomologacion);
router.get('/homologacion/reporte/pdf', homologacionController.descargarPDF);

module.exports = router;

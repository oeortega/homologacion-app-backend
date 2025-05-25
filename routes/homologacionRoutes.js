const express = require('express');
const router = express.Router();
const homologacionController = require('../controllers/homologacionController');

/**
 * @swagger
 * tags:
 *   name: Homologación
 *   description: Operaciones relacionadas con la homologación de materias
 */

/**
 * @swagger
 * /homologacion/calcular:
 *   post:
 *     summary: Calcula la homologación para un estudiante
 *     tags: [Homologación]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - tipo_documento
 *               - cedula
 *               - nombre
 *               - materias_antiguas
 *             properties:
 *               tipo_documento:
 *                 type: string
 *                 example: "CC"
 *               cedula:
 *                 type: string
 *                 example: "12345678"
 *               nombre:
 *                 type: string
 *                 example: "Carlos Torres"
 *               materias_antiguas:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     nombre:
 *                       type: string
 *                       example: "Matemáticas I"
 *                     nota:
 *                       type: number
 *                       example: 4.0
 *     responses:
 *       200:
 *         description: Resultado de la homologación
 *       400:
 *         description: Error en los datos enviados
 */
router.post('/homologacion/calcular', homologacionController.calcularHomologacion);

/**
 * @swagger
 * /homologacion/reporte/pdf:
 *   get:
 *     summary: Descarga el PDF con el reporte de la última homologación realizada
 *     tags: [Homologación]
 *     responses:
 *       200:
 *         description: PDF generado exitosamente
 *         content:
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       404:
 *         description: No hay datos disponibles para generar el PDF
 */
router.get('/homologacion/reporte/pdf', homologacionController.descargarPDF);

module.exports = router;

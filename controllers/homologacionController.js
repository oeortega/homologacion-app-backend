const oracleService = require('../services/oracleService');
const { generarPDFDesdeHTML } = require('../utils/pdfFromHtml');

let ultimaHomologacion = null;

async function calcularHomologacion(req, res) {
  const { tipo_documento, cedula, nombre, materias_antiguas } = req.body;

  if (!materias_antiguas || !Array.isArray(materias_antiguas)) {
    return res.status(400).json({ error: 'materias_antiguas debe ser un array' });
  }

  const homologados = [];
  let creditos_homologados = 0;

  for (const materia of materias_antiguas) {
    if (materia.nota >= 3.5) {
      const homologaciones = await oracleService.buscarHomologacion(materia.nombre);
      if (homologaciones.length > 0) {
        const [codigoAnt, nombreAnt, codigoNuevo, nombreNuevo] = homologaciones[0];
        const creditos = await oracleService.obtenerCreditosPorCodigo(codigoNuevo);

        creditos_homologados += creditos;
        homologados.push({
          asignatura_antigua: materia.nombre,
          nombre_nueva: nombreNuevo,
          codigo: codigoNuevo,
          nota: materia.nota
        });
      }
    }
  }

  const todasMaterias = await oracleService.obtenerPensumNuevo();
  const materias_faltantes = todasMaterias.filter(pn =>
    !homologados.find(h => h.nombre_nueva.toUpperCase() === pn.nombre.toUpperCase())
  );

  const totalCreditos = await oracleService.obtenerTotalCreditosPensumNuevo();
  const creditos_faltantes = totalCreditos - creditos_homologados;

  const resultado = {
    nombre,
    tipo_documento,
    cedula,
    creditos_homologados,
    creditos_faltantes,
    materias_faltantes,
    detalle_homologacion: homologados
  };

  ultimaHomologacion = resultado;
  res.json(resultado);
}

function descargarPDF(req, res) {
  if (!ultimaHomologacion) {
    return res.status(404).json({ error: 'No hay datos para generar PDF. Primero calcule la homologación.' });
  }

  generarPDFDesdeHTML(ultimaHomologacion, res);
}

async function getOldPensum(req, res) {
  const pensum = await oracleService.getOldPensum(); 
  res.json(pensum);
}

module.exports = {
  calcularHomologacion,
  descargarPDF,
  getOldPensum
};

const { getConnection } = require('../config/db');

async function buscarHomologacion(nombreAntiguo) {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      `SELECT * FROM HOMOLOGACION_ASIGNATURAS WHERE UPPER(NOMBRE_ANTERIOR) = :nombre`,
      [nombreAntiguo.toUpperCase()]
    );
    return result.rows;
  } finally {
    await connection.close();
  }
}

async function obtenerCreditosPorCodigo(codigo) {
  const connection = await getConnection();
  try {
    const result = await connection.execute(
      `SELECT CREDITOS FROM PENSUM_NUEVO WHERE CODIGO = :codigo`,
      [codigo]
    );
    return result.rows.length ? result.rows[0][0] : 0;
  } finally {
    await connection.close();
  }
}

async function obtenerPensumNuevo() {
  const connection = await getConnection();
  try {
    const result = await connection.execute(`SELECT CODIGO, ASIGNATURA FROM PENSUM_NUEVO`);
    return result.rows.map(row => ({ codigo: row[0], nombre: row[1] }));
  } finally {
    await connection.close();
  }
}

async function obtenerTotalCreditosPensumNuevo() {
  const connection = await getConnection();
  try {
    const result = await connection.execute(`SELECT SUM(CREDITOS) FROM PENSUM_NUEVO`);
    return result.rows[0][0] || 0;
  } finally {
    await connection.close();
  }
}

async function getOldPensum() {
  const connection = await getConnection();
  try {
    const result = await connection.execute(`SELECT CODIGO, ASIGNATURA FROM PENSUM_VIEJO`);
    return result.rows.map(row => ({ codigo: row[0], nombre: row[1] }));
  } finally {
    await connection.close();
  }
}

module.exports = {
  buscarHomologacion,
  obtenerCreditosPorCodigo,
  obtenerPensumNuevo,
  obtenerTotalCreditosPensumNuevo,
  getOldPensum
};

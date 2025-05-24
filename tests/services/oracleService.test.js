jest.resetModules();
const oracleService = require('../../services/oracleService');
const db = require('../../config/db');

jest.mock('../../config/db', () => ({
  getConnection: jest.fn()
}));

describe('oracleService', () => {
  test('buscarHomologacion debería devolver resultados', async () => {
    db.getConnection.mockResolvedValue({
      execute: jest.fn().mockResolvedValue({
        rows: [['MAT101', 'ÁLGEBRA LINEAL', 'MT301B', 'ÁLGEBRA LINEAL']]
      }),
      close: jest.fn()
    });

    const result = await oracleService.buscarHomologacion('Álgebra Lineal');
    expect(result).toEqual([['MAT101', 'ÁLGEBRA LINEAL', 'MT301B', 'ÁLGEBRA LINEAL']]);
  });

  test('obtenerCreditosPorCodigo devuelve 0 si no hay filas', async () => {
    db.getConnection.mockResolvedValue({
      execute: jest.fn().mockResolvedValue({ rows: [] }),
      close: jest.fn()
    });

    const result = await oracleService.obtenerCreditosPorCodigo('X000');
    expect(result).toBe(0);
  });

  test('obtenerTotalCreditosPensumNuevo devuelve 0 si resultado incompleto', async () => {
    db.getConnection.mockResolvedValue({
      execute: jest.fn().mockResolvedValue({ rows: [[]] }),
      close: jest.fn()
    });

    const result = await oracleService.obtenerTotalCreditosPensumNuevo();
    expect(result).toBe(0);
  });
});

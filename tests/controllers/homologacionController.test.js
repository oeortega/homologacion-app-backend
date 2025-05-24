const { calcularHomologacion, descargarPDF } = require('../../controllers/homologacionController');
const oracleService = require('../../services/oracleService');

jest.mock('../../services/oracleService');

describe('calcularHomologacion', () => {
  beforeEach(() => {
    oracleService.buscarHomologacion.mockResolvedValue([
      ['MAT101', 'ÁLGEBRA LINEAL', 'MT301B', 'ÁLGEBRA LINEAL']
    ]);
    oracleService.obtenerCreditosPorCodigo.mockResolvedValue(3);
    oracleService.obtenerPensumNuevo.mockResolvedValue([
      { codigo: 'MT301B', nombre: 'ÁLGEBRA LINEAL' },
      { codigo: 'MT104', nombre: 'CÁLCULO DIFERENCIAL' }
    ]);
    oracleService.obtenerTotalCreditosPensumNuevo.mockResolvedValue(120);
  });

  test('devuelve respuesta con homologación válida', async () => {
    const req = {
      body: {
        tipo_documento: 'CC',
        cedula: '1234567890',
        nombre: 'Juan Pérez',
        materias_antiguas: [
          { nombre: 'Álgebra Lineal', semestre: 1, nota: 4.2 }
        ]
      }
    };
    const res = { json: jest.fn() };

    await calcularHomologacion(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      nombre: 'Juan Pérez',
      cedula: '1234567890',
      creditos_homologados: 3,
      detalle_homologacion: expect.any(Array)
    }));
  });

  test('materia con nota reprobada no debe ser homologada', async () => {
    const req = {
      body: {
        tipo_documento: 'CC',
        cedula: '1234567890',
        nombre: 'Juan Pérez',
        materias_antiguas: [
          { nombre: 'Electiva Básica', semestre: 2, nota: 2.0 }
        ]
      }
    };
    const res = { json: jest.fn() };

    await calcularHomologacion(req, res);
    expect(res.json).toHaveBeenCalledWith(expect.objectContaining({
      creditos_homologados: 0,
      detalle_homologacion: []
    }));
  });

  test('debería retornar error si faltan campos requeridos', async () => {
    const req = { body: {} };
    const res = { status: jest.fn(() => res), json: jest.fn() };

    await calcularHomologacion(req, res);
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ error: 'materias_antiguas debe ser un array' });
  });
  test('descargarPDF debe responder 404 si no hay homologación previa', () => {
    const req = {};
    const res = { status: jest.fn(() => res), json: jest.fn() };

    global.ultimaHomologacion = null;

    descargarPDF(req, res);
    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      error: 'No hay datos para generar PDF. Primero calcule la homologación.'
    });
  });
});

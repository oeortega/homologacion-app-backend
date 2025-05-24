// tests/routes/homologacionRoutes.test.js

const request = require('supertest');
const express = require('express');
const routes = require('../../routes/homologacionRoutes');
const oracleService = require('../../services/oracleService');

jest.mock('../../services/oracleService');

const app = express();
app.use(express.json());
app.use('/', routes);

describe('POST /homologacion/calcular', () => {
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

  test('debería calcular homologación correctamente', async () => {
    const res = await request(app).post('/homologacion/calcular').send({
      tipo_documento: 'CC',
      cedula: '1066269678',
      nombre: 'Carlos Alejandro',
      materias_antiguas: [
        { nombre: 'Álgebra Lineal', semestre: 1, nota: 4.5 }
      ]
    });

    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('creditos_homologados');
    expect(res.body.detalle_homologacion[0].nombre_nueva).toBe('ÁLGEBRA LINEAL');
  });
});



const { generarPDFDesdeHTML } = require('../../utils/pdfFromHtml');
const fs = require('fs');
const path = require('path');

jest.mock('puppeteer', () => ({
  launch: jest.fn().mockResolvedValue({
    newPage: jest.fn().mockResolvedValue({
      setContent: jest.fn(),
      pdf: jest.fn().mockResolvedValue(Buffer.from('PDF content'))
    }),
    close: jest.fn()
  })
}));

describe('generarPDFDesdeHTML', () => {
  test('debería generar PDF y enviarlo', async () => {
    const mockRes = {
      setHeader: jest.fn(),
      send: jest.fn()
    };

    const mockData = {
      nombre: 'Juan Pérez',
      cedula: '1234567890',
      detalle_homologacion: [
        {
          asignatura_antigua: 'Álgebra Lineal',
          nombre_nueva: 'ÁLGEBRA LINEAL',
          codigo: 'MT301B',
          nota: 4.5
        }
      ]
    };

    await generarPDFDesdeHTML(mockData, mockRes);
    expect(mockRes.send).toHaveBeenCalled();
    expect(mockRes.setHeader).toHaveBeenCalledWith(
      'Content-Disposition',
      'attachment; filename=homologacion_1234567890.pdf'
    );
  });
});

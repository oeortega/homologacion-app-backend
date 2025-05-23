const puppeteer = require('puppeteer');
const fs = require('fs');
const path = require('path');

async function generarPDFDesdeHTML(datos, res) {
  const htmlTemplate = fs.readFileSync(path.join(__dirname, '../templates/homologacion.html'), 'utf-8');

  const fecha = new Date().toLocaleDateString('es-CO', { year: 'numeric', month: 'long', day: 'numeric' });

  const filas = datos.detalle_homologacion.map(m =>
    `<tr>
      <td>${m.asignatura_antigua.toUpperCase()}</td>
      <td>${m.nombre_nueva.toUpperCase()}</td>
      <td>${m.codigo}</td>
      <td>${m.nota.toFixed(1)}</td>
    </tr>`
  ).join('\n');

  // Leer logo y convertirlo en base64
  const logoPath = path.resolve(__dirname, '../public/img/logo-universidad.png');
  const logoBase64 = fs.readFileSync(logoPath, { encoding: 'base64' });
  const logoDataURI = `data:image/png;base64,${logoBase64}`;

  const htmlFinal = htmlTemplate
    .replace(/{{fecha}}/g, fecha)
    .replace(/{{nombre_estudiante}}/g, datos.nombre.toUpperCase())
    .replace(/{{cedula}}/g, datos.cedula)
    .replace(/{{filas}}/g, filas)
    .replace(/{{logo_base64}}/g, logoDataURI);

  const browser = await puppeteer.launch({ headless: true });
  const page = await browser.newPage();
  await page.setContent(htmlFinal, { waitUntil: 'networkidle0' });

  const pdfBuffer = await page.pdf({ format: 'A4', printBackground: true });
  await browser.close();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader('Content-Disposition', `attachment; filename=homologacion_${datos.cedula}.pdf`);
  res.send(pdfBuffer);
}

module.exports = { generarPDFDesdeHTML };

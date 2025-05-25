const express = require('express');
const bodyParser = require('body-parser');
const homologacionRoutes = require('./routes/homologacionRoutes');
const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('./swagger/swaggerConfig');

const app = express();
const PORT = 3001;

app.use(bodyParser.json());

// Rutas Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas de tu API
app.use('/', homologacionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  console.log(`Documentación Swagger en http://localhost:${PORT}/api-docs`);
});

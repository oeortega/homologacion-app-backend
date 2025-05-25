const swaggerJSDoc = require('swagger-jsdoc');

const swaggerDefinition = {
  openapi: '3.0.0',
  info: {
    title: 'API de Homologación',
    version: '1.0.0',
    description: 'Documentación de la API que calcula homologaciones y genera reportes en PDF',
  },
  servers: [
    {
      url: 'http://localhost:3001',
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ['./routes/*.js'], // Aquí debe apuntar a este archivo
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;

const express = require('express');
const bodyParser = require('body-parser');
const homologacionRoutes = require('./routes/homologacionRoutes');

const app = express();
const PORT = 3000;

app.use(bodyParser.json());
app.use('/', homologacionRoutes);

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

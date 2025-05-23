require('dotenv').config();
const oracledb = require('oracledb');

// Solo si estás en Windows y usas Instant Client
if (process.env.ORACLE_CLIENT_LIB) {
    oracledb.initOracleClient({ libDir: process.env.ORACLE_CLIENT_LIB });
}

const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    connectString: process.env.DB_CONNECT_STRING
};

// ✅ Esta es la función que espera oracleService.js
async function getConnection() {
  try {
    const connection = await oracledb.getConnection(dbConfig);
    
    return connection;
  } catch (err) {
    console.error('Error conectando a Oracle:', err);
    throw err;
  }
}

// ✅ Exportamos la función correctamente
module.exports = { getConnection };

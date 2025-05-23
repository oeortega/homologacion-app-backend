const { getConnection } = require('../config/db'); // ✅ importa correctamente

async function testConnection() {
  let connection;

  try {
    connection = await getConnection(); // ✅ usa la función del módulo
    console.log('✅ Conexión exitosa a Oracle DB');

    const result = await connection.execute('SELECT 1 FROM DUAL');
    console.log('Resultado de prueba:', result.rows);
  } catch (err) {
    console.error('❌ Error al conectar a Oracle DB:', err);
  } finally {
    if (connection) {
      try {
        await connection.close();
        console.log('🔌 Conexión cerrada correctamente');
      } catch (err) {
        console.error('⚠️ Error al cerrar la conexión:', err);
      }
    }
  }
}

testConnection();

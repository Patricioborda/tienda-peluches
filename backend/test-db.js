require('dotenv').config();
const mysql = require('mysql2/promise');

async function testConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'admin',
      password: process.env.DB_PASSWORD || 'capibara123',
      database: process.env.DB_NAME || 'capibara_db',
      port: process.env.DB_PORT || 3306
    });

    console.log('✅ Conectado a MySQL correctamente');
    await connection.end();
  } catch (err) {
    console.error('❌ Error al conectar a MySQL:', err.message);
  }
}

testConnection();
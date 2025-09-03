const mysql = require('mysql2/promise');
require('dotenv').config();

async function createDatabaseAndUser() {
  const rootUser = process.env.ROOT_USER || 'root';
  const rootPassword = process.env.ROOT_PASSWORD || '';
  const dbName = process.env.DB_NAME || 'capibara_db';
  const adminUser = process.env.DB_USER || 'admin';
  const adminPassword = process.env.DB_PASSWORD || 'capibara123';
  const host = process.env.DB_HOST || 'localhost';

  try {
    const connection = await mysql.createConnection({
      host,
      user: rootUser,
      password: rootPassword,
      multipleStatements: true
    });

    const sql = `
      CREATE DATABASE IF NOT EXISTS \`${dbName}\` CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci;
      CREATE USER IF NOT EXISTS '${adminUser}'@'localhost' IDENTIFIED WITH mysql_native_password BY '${adminPassword}';
      GRANT ALL PRIVILEGES ON \`${dbName}\`.* TO '${adminUser}'@'localhost';
      FLUSH PRIVILEGES;
    `;

    await connection.query(sql);
    console.log(`✅ Base de datos '${dbName}' y usuario '${adminUser}' creados correctamente.`);

    await connection.end();
  } catch (err) {
    console.error('❌ Error al crear la base de datos o el usuario:', err.message);
  }
}

createDatabaseAndUser();

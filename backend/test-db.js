const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'admin',
  password: 'peluche123',
  database: 'peluches_db'
});

connection.connect(err => {
  if (err) console.error('❌ Error:', err.message);
  else console.log('✅ Conectado a MySQL correctamente');
  connection.end();
});

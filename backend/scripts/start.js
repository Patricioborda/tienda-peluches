const { execSync } = require('child_process');
const { Sequelize } = require('sequelize');
const config = require('../config/config.js')['production'];

const sequelize = new Sequelize(config.database, config.username, config.password, config);

(async () => {
  try {
    console.log('🔹 Ejecutando migraciones...');
    execSync('npx sequelize-cli db:migrate', { stdio: 'inherit' });

    console.log('🔹 Verificando si la tabla categorias tiene datos...');
    const [results] = await sequelize.query('SELECT COUNT(*) as count FROM categorias;');
    if (results[0].count === 0) {
      console.log('🔹 Ejecutando seed de categorias y productos...');
      execSync('npx sequelize-cli db:seed:all', { stdio: 'inherit' });
    } else {
      console.log('🔹 Las tablas ya tienen datos, saltando seed.');
    }

    console.log('🔹 Iniciando servidor...');
    require('../index.js');

  } catch (err) {
    console.error('❌ Error durante el inicio automático:', err);
    process.exit(1);
  }
})();

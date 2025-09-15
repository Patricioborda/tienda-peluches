'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {
      const now = new Date();
      const categorias = ['Peluches', 'Juguetes', 'Ropa Infantil', 'Accesorios', 'Decoración'];

      // Obtenemos las existentes, evitando que falle si no hay ninguna
      const [existingRows] = await queryInterface.sequelize.query(
        `SELECT nombre FROM categorias WHERE nombre IN (:names)`,
        { replacements: { names: categorias }, type: queryInterface.sequelize.QueryTypes.SELECT }
      ).catch(() => [[]]);

      const existingNames = (existingRows || []).map(r => r.nombre);
      const toInsert = categorias
        .filter(n => !existingNames.includes(n))
        .map(nombre => ({ nombre, createdAt: now, updatedAt: now }));

      if (toInsert.length) {
        await queryInterface.bulkInsert('categorias', toInsert, {});
      }
    } catch (err) {
      console.error('⚠️ Error en seed de categorias, se omite para no romper arranque:', err.message);
    }
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('categorias', {
      nombre: { [Sequelize.Op.in]: ['Peluches', 'Juguetes', 'Ropa Infantil', 'Accesorios', 'Decoración'] }
    }, {});
  }
};

'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categorias', [
      { nombre: 'Peluches', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Juguetes', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Ropa Infantil', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Accesorios', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Decoración', createdAt: new Date(), updatedAt: new Date() }
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categorias', null, {});
  }
};

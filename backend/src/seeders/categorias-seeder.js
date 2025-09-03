// backend/src/seeders/categorias-seeder.js
'use strict';
const { Categoria } = require('../modules/Categorias/models/Categoria');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('categorias', [
      { nombre: 'Osos', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Unicornios', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Perros', createdAt: new Date(), updatedAt: new Date() },
      { nombre: 'Gatos', createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('categorias', null, {});
  }
};

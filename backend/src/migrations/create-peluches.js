'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('peluches', {
      id: { type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
      nombre: { type: Sequelize.STRING(100), allowNull: false },
      descripcion: { type: Sequelize.TEXT, allowNull: true },
      precio: { type: Sequelize.DECIMAL(10,2), allowNull: false },
      stock: { type: Sequelize.INTEGER, allowNull: false, defaultValue: 0 },
      imagen: { type: Sequelize.STRING(255), allowNull: true },
      categoriaId: { type: Sequelize.INTEGER, allowNull: false }, // columna ya creada aquí
      createdAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') },
      updatedAt: { type: Sequelize.DATE, allowNull: false, defaultValue: Sequelize.literal('CURRENT_TIMESTAMP') }
    });

    await queryInterface.addIndex('peluches', ['precio']);
    await queryInterface.addIndex('peluches', ['categoriaId']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('peluches');
  }
};

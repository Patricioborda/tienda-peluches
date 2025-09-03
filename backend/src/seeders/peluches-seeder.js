'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const now = new Date();

    // Primero obtenemos las categorías ya insertadas para tomar sus IDs
    const categorias = await queryInterface.sequelize.query(
      `SELECT id, nombre FROM categorias;`
    );

    const categoriaMap = {};
    categorias[0].forEach(cat => {
      categoriaMap[cat.nombre] = cat.id;
    });

    await queryInterface.bulkInsert('peluches', [
      {
        nombre: 'Osito Teddy Clásico',
        descripcion: 'Peluche suave de oso marrón',
        precio: 12500.50,
        stock: 25,
        imagen: 'https://example.com/osos/teddy.jpg',
        categoriaId: categoriaMap['Osos'],
        createdAt: now,
        updatedAt: now
      },
      {
        nombre: 'Unicornio Arcoíris',
        descripcion: 'Unicornio mágico con crin multicolor',
        precio: 18999.99,
        stock: 15,
        imagen: 'https://example.com/unicornios/rainbow.jpg',
        categoriaId: categoriaMap['Unicornios'],
        createdAt: now,
        updatedAt: now
      },
      {
        nombre: 'Perrito Beagle',
        descripcion: 'Peluche perrito tierno',
        precio: 9900.00,
        stock: 30,
        imagen: 'https://example.com/perros/beagle.jpg',
        categoriaId: categoriaMap['Perros'],
        createdAt: now,
        updatedAt: now
      }
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('peluches', null, {});
  }
};

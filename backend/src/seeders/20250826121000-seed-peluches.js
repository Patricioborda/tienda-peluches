'use strict';

module.exports = {
  async up (queryInterface) {
    const now = new Date();
    await queryInterface.bulkInsert('peluches', [
      {
        nombre: 'Osito Teddy Clásico',
        descripcion: 'Peluche suave de oso marrón',
        precio: 12500.50,
        stock: 25,
        imagen: 'https://example.com/osos/teddy.jpg',
        categoria: 'Osos',
        createdAt: now, updatedAt: now
      },
      {
        nombre: 'Unicornio Arcoíris',
        descripcion: 'Unicornio mágico con crin multicolor',
        precio: 18999.99,
        stock: 15,
        imagen: 'https://example.com/unicornios/rainbow.jpg',
        categoria: 'Unicornios',
        createdAt: now, updatedAt: now
      },
      {
        nombre: 'Perrito Beagle',
        descripcion: 'Peluche perrito tierno',
        precio: 9900.00,
        stock: 30,
        imagen: 'https://example.com/perros/beagle.jpg',
        categoria: 'Perros',
        createdAt: now, updatedAt: now
      }
    ]);
  },

  async down (queryInterface) {
    await queryInterface.bulkDelete('peluches', null, {});
  }
};

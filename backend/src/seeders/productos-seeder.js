'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    try {
      const now = new Date();

      // Obtenemos categorías existentes para sus IDs
      const [categoriasRows] = await queryInterface.sequelize.query(`SELECT id, nombre FROM categorias;`).catch(() => [[]]);

      const categoriaMap = {};
      (categoriasRows || []).forEach(cat => {
        categoriaMap[cat.nombre] = cat.id;
      });

      const productos = [
        {
          nombre: 'Osito Teddy Clásico',
          descripcion: 'Peluche suave de oso marrón',
          precio: 12500.50,
          stock: 25,
          imagen: 'https://example.com/osos/teddy.jpg',
          categoriaId: categoriaMap['Peluches'],
          createdAt: now,
          updatedAt: now
        },
        {
          nombre: 'Unicornio Arcoíris',
          descripcion: 'Unicornio mágico con crin multicolor',
          precio: 18999.99,
          stock: 15,
          imagen: 'https://example.com/unicornios/rainbow.jpg',
          categoriaId: categoriaMap['Peluches'],
          createdAt: now,
          updatedAt: now
        },
        {
          nombre: 'Remera Infantil Star',
          descripcion: 'Remera de algodón con estampado divertido',
          precio: 3500.00,
          stock: 50,
          imagen: 'https://example.com/ropa/remera_star.jpg',
          categoriaId: categoriaMap['Ropa Infantil'],
          createdAt: now,
          updatedAt: now
        },
        {
          nombre: 'Lámpara de Unicornio',
          descripcion: 'Lámpara decorativa para habitación infantil',
          precio: 7200.00,
          stock: 20,
          imagen: 'https://example.com/decoracion/lampara_unicornio.jpg',
          categoriaId: categoriaMap['Decoración'],
          createdAt: now,
          updatedAt: now
        },
        {
          nombre: 'Mochila Infantil Dinosaurio',
          descripcion: 'Mochila resistente y colorida para niños',
          precio: 4500.00,
          stock: 35,
          imagen: 'https://example.com/accesorios/mochila_dino.jpg',
          categoriaId: categoriaMap['Accesorios'],
          createdAt: now,
          updatedAt: now
        }
      ];

      const productosFiltrados = productos.filter(p => p.categoriaId);
      if (productosFiltrados.length) {
        await queryInterface.bulkInsert('productos', productosFiltrados, {});
      }
    } catch (err) {
      console.error('⚠️ Error en seed de productos, se omite para no romper arranque:', err.message);
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('productos', null, {});
  }
};

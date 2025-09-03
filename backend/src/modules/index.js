const Categoria = require('./Categorias/models/Categoria');
const Producto = require('./Producto/models/Product');

// Asociaciones
Categoria.hasMany(Producto, { foreignKey: 'categoriaId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId' });

module.exports = { Categoria, Producto };

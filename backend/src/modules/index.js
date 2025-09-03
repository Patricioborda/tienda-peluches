const Categoria = require('./Categorias/models/Categoria');
const Peluche = require('./Peluches/models/Peluche');

// Asociaciones
Categoria.hasMany(Peluche, { foreignKey: 'categoriaId', onDelete: 'RESTRICT', onUpdate: 'CASCADE' });
Peluche.belongsTo(Categoria, { foreignKey: 'categoriaId' });

module.exports = { Categoria, Peluche };

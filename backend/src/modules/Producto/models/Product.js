const { DataTypes } = require('sequelize');
const { sequelize } = require('../../../utils/database');
const Categoria = require('../../Categorias/models/Categoria');

const Producto = sequelize.define('Producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false,
    validate: {
      notEmpty: { msg: 'El nombre del producto es obligatorio' },
      len: { args: [2, 100], msg: 'El nombre debe tener entre 2 y 100 caracteres' }
    }
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true,
    validate: { len: { args: [0, 1000], msg: 'La descripción no puede exceder los 1000 caracteres' } }
  },
  precio: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
    validate: { 
      isDecimal: { msg: 'El precio debe ser decimal' },
      min: { args: [0], msg: 'No puede ser negativo' }
    }
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
    validate: { isInt: { msg: 'Debe ser entero' }, min: { args: [0], msg: 'No puede ser negativo' } }
  },
  imagen: {
    type: DataTypes.STRING(255),
    allowNull: true,
    validate: { isUrl: { msg: 'Debe ser URL válida' } }
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: { model: 'categorias', key: 'id' },
    validate: { notEmpty: { msg: 'Debe seleccionar una categoría' } }
  },
}, {
  tableName: 'productos',
  timestamps: true
});

// Relaciones
Producto.belongsTo(Categoria, { foreignKey: 'categoriaId', as: 'categoria' });

module.exports = Producto;

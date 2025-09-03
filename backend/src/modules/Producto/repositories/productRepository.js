const Producto = require('../../Producto/models/Product');
const Categoria = require('../../Categorias/models/Categoria');

const getAll = async () => {
  return Producto.findAll({
    include: [
      {
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre']
      }
    ],
    order: [['nombre', 'ASC']]
  });
};

const getById = async (id) => {
  return Producto.findByPk(id, {
    include: [
      {
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre']
      }
    ]
  });
};

const create = async (data) => Producto.create(data);

const update = async (producto, data) => producto.update(data);

const remove = async (producto) => producto.destroy();

module.exports = { getAll, getById, create, update, remove };

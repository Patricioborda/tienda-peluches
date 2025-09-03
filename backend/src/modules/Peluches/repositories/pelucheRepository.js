const Peluche = require('../models/Peluche');
const Categoria = require('../../Categorias/models/Categoria');

const getAll = async () => {
  return Peluche.findAll({
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
  return Peluche.findByPk(id, {
    include: [
      {
        model: Categoria,
        as: 'categoria',
        attributes: ['id', 'nombre']
      }
    ]
  });
};

const create = async (data) => Peluche.create(data);

const update = async (peluche, data) => peluche.update(data);

const remove = async (peluche) => peluche.destroy();

module.exports = { getAll, getById, create, update, remove };

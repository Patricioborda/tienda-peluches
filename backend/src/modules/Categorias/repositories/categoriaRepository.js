// backend/src/modules/Categorias/repositories/categoriaRepository.js
const Categoria = require('../models/Categoria');

const getAll = async () => Categoria.findAll();
const getById = async (id) => Categoria.findByPk(id);
const create = async (data) => Categoria.create(data);
const update = async (categoria, data) => categoria.update(data);
const remove = async (categoria) => categoria.destroy();

module.exports = { getAll, getById, create, update, remove };

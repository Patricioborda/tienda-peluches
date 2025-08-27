const Peluche = require('../models/Peluche');

const getAll = async () => Peluche.findAll();
const getById = async (id) => Peluche.findByPk(id);
const create = async (data) => Peluche.create(data);
const update = async (peluche, data) => peluche.update(data);
const remove = async (peluche) => peluche.destroy();

module.exports = { getAll, getById, create, update, remove };

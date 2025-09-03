// backend/src/modules/Categorias/controllers/categoriaController.js
const service = require('../services/categoriaService');

const getCategorias = async (req, res, next) => {
  try {
    const categorias = await service.list();
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

const getCategoria = async (req, res, next) => {
  try {
    const categoria = await service.get(req.params.id);
    res.json(categoria);
  } catch (error) {
    next(error);
  }
};

const createCategoria = async (req, res, next) => {
  try {
    const newCategoria = await service.create(req.body);
    res.status(201).json(newCategoria);
  } catch (error) {
    next(error);
  }
};

const updateCategoria = async (req, res, next) => {
  try {
    const updated = await service.update(req.params.id, req.body);
    res.json(updated);
  } catch (error) {
    next(error);
  }
};

const deleteCategoria = async (req, res, next) => {
  try {
    const result = await service.remove(req.params.id);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};

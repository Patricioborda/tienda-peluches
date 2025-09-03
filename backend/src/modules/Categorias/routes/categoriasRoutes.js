const express = require('express');
const router = express.Router();
const categoriasService = require('../services/categoriasService');

// Listar todas
router.get('/', async (req, res, next) => {
  try {
    const categorias = await categoriasService.list();
    res.json(categorias);
  } catch (err) {
    next(err);
  }
});

// Crear
router.post('/', async (req, res, next) => {
  try {
    const nueva = await categoriasService.create(req.body);
    res.status(201).json(nueva);
  } catch (err) {
    next(err);
  }
});

// Actualizar
router.put('/:id', async (req, res, next) => {
  try {
    const actualizada = await categoriasService.update(req.params.id, req.body);
    res.json(actualizada);
  } catch (err) {
    next(err);
  }
});

// Eliminar
router.delete('/:id', async (req, res, next) => {
  try {
    const result = await categoriasService.remove(req.params.id);
    res.json(result);
  } catch (err) {
    next(err);
  }
});

module.exports = router;

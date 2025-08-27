const express = require('express');
const router = express.Router();
const controller = require('../controllers/pelucheController');
const { validatePelucheBody, validateIdParam, handleValidation } = require('../validators/pelucheValidator');

// GET /api/peluches
router.get('/', controller.getPeluches);

// GET /api/peluches/:id
router.get('/:id', validateIdParam, handleValidation, controller.getPeluche);

// POST /api/peluches
router.post('/', validatePelucheBody, handleValidation, controller.createPeluche);

// PUT /api/peluches/:id
router.put('/:id', [...validateIdParam, ...validatePelucheBody], handleValidation, controller.updatePeluche);

// DELETE /api/peluches/:id
router.delete('/:id', validateIdParam, handleValidation, controller.deletePeluche);

module.exports = router;

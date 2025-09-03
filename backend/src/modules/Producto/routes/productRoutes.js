const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const { validateProductoBody, validateIdParam, handleValidation } = require('../validators/productValidator');

// GET /api/productos
router.get('/', controller.getProductos);

// GET /api/productos/:id
router.get('/:id', validateIdParam, handleValidation, controller.getProducto);

// POST /api/productos
router.post('/', validateProductoBody, handleValidation, controller.createProducto);

// PUT /api/productos/:id
router.put('/:id', [...validateIdParam, ...validateProductoBody], handleValidation, controller.updateProducto);

// DELETE /api/productos/:id
router.delete('/:id', validateIdParam, handleValidation, controller.deleteProducto);

module.exports = router;

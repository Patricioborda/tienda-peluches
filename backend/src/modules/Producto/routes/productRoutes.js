const express = require('express');
const router = express.Router();
const controller = require('../controllers/productController');
const upload = require('../../../middlewares/upload');
const { sanitizeFormData, validateProductoBody, validateIdParam, handleValidation } = require('../validators/productValidator');

// GET /api/productos
router.get('/', controller.getProductos);

// GET /api/productos/:id
router.get('/:id', validateIdParam, handleValidation, controller.getProducto);

// POST /api/productos
router.post(
  '/',
  upload.single('imagen'),
  sanitizeFormData,
  validateProductoBody,
  handleValidation,
  controller.createProducto
);

// PUT /api/productos/:id
router.put(
  '/:id',
  upload.single('imagen'),
  sanitizeFormData,
  [...validateIdParam, ...validateProductoBody],
  handleValidation,
  controller.updateProducto
);

// DELETE /api/productos/:id
router.delete('/:id', validateIdParam, handleValidation, controller.deleteProducto);

module.exports = router;

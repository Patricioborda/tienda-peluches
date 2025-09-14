const express = require('express');
const router = express.Router();
const upload = require('../../../../src/middlewares/upload');
const {
  getProductos,
  getProducto,
  createProducto,
  updateProducto,
  deleteProducto
} = require('../controllers/productController');

// Rutas de productos
router.get('/', getProductos);
router.get('/:id', getProducto);
router.post('/', upload.single('imagen'), createProducto);
router.put('/:id', upload.single('imagen'), updateProducto);
router.delete('/:id', deleteProducto);

module.exports = router;

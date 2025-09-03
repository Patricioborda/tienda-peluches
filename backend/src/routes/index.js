const express = require('express');
const router = express.Router();
const productosRoutes = require('../modules/Producto/routes/productRoutes');
const categoriasRoutes = require('../modules/Categorias/routes/categoriasRoutes');

router.use('/productos', productosRoutes);
router.use('/categorias', categoriasRoutes);

module.exports = router;

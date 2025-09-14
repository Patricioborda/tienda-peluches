const service = require('../services/productService');

exports.getProductos = async (req, res, next) => {
  try {
    const data = await service.list();
    res.json(data);
  } catch (err) { next(err); }
};

exports.getProducto = async (req, res, next) => {
  try {
    const data = await service.get(parseInt(req.params.id, 10));
    res.json(data);
  } catch (err) { next(err); }
};

exports.createProducto = async (req, res, next) => {
  try {
    const productoData = { ...req.body };
    if (req.file) productoData.imagen = req.file.filename;
    const data = await service.create(productoData);
    res.status(201).json(data);
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
};

exports.updateProducto = async (req, res, next) => {
  try {
    const productoData = { ...req.body };
    if (req.file) productoData.imagen = req.file.filename;
    else if (req.body.removeImage === 'true') productoData.imagen = null;

    const data = await service.update(parseInt(req.params.id, 10), productoData);
    res.json(data);
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
};

exports.deleteProducto = async (req, res, next) => {
  try {
    const data = await service.remove(parseInt(req.params.id, 10));
    res.json(data);
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
};

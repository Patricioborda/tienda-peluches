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
    const data = await service.create(req.body);
    res.status(201).json(data);
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
};

exports.updateProducto = async (req, res, next) => {
  try {
    const data = await service.update(parseInt(req.params.id, 10), req.body);
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

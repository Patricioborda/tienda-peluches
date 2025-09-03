const service = require('../services/pelucheService');

exports.getPeluches = async (req, res, next) => {
  try {
    const data = await service.list();
    res.json(data);
  } catch (err) { next(err); }
};

exports.getPeluche = async (req, res, next) => {
  try {
    const data = await service.get(parseInt(req.params.id, 10));
    res.json(data);
  } catch (err) { next(err); }
};

exports.createPeluche = async (req, res, next) => {
  try {
    const data = await service.create(req.body);
    res.status(201).json(data);
  } catch (err) { 
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
};

exports.updatePeluche = async (req, res, next) => {
  try {
    const data = await service.update(parseInt(req.params.id, 10), req.body);
    res.json(data);
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
};

exports.deletePeluche = async (req, res, next) => {
  try {
    const data = await service.remove(parseInt(req.params.id, 10));
    res.json(data);
  } catch (err) {
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
};

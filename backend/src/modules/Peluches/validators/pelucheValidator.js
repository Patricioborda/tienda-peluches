const { body, param, validationResult } = require('express-validator');

const categoriasValidas = ['Osos', 'Unicornios', 'Perros', 'Gatos', 'Conejos', 'Otros'];

const validatePelucheBody = [
  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre del peluche es obligatorio')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  body('descripcion')
    .optional()
    .isLength({ max: 1000 }).withMessage('La descripción no puede exceder los 1000 caracteres'),

  body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .isDecimal().withMessage('El precio debe ser un número decimal'),

  body('stock')
    .notEmpty().withMessage('El stock es obligatorio')
    .isInt({ min: 0 }).withMessage('El stock debe ser un entero >= 0'),

  body('imagen')
    .optional()
    .isURL().withMessage('La imagen debe ser una URL válida'),

  body('categoria')
    .notEmpty().withMessage('La categoría es obligatoria')
    .isIn(categoriasValidas).withMessage(`La categoría debe ser una de: ${categoriasValidas.join(', ')}`),
];

const validateIdParam = [
  param('id').isInt({ min: 1 }).withMessage('El id debe ser un entero positivo'),
];

const handleValidation = (req, res, next) => {
  const result = validationResult(req);
  if (!result.isEmpty()) {
    const msg = result.array().map(e => e.msg).join(', ');
    return res.status(400).json({ success: false, error: msg });
  }
  next();
};

module.exports = { validatePelucheBody, validateIdParam, handleValidation };

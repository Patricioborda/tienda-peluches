const { body, param, validationResult } = require('express-validator');
const Categoria = require('../../Categorias/models/Categoria');

// Sanitize FormData (todos llegan como strings)
const sanitizeFormData = (req, res, next) => {
  for (const key in req.body) {
    if (req.body.hasOwnProperty(key)) {
      req.body[key] = String(req.body[key]).trim();
    }
  }
  next();
};

const validateProductoBody = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isLength({ min: 2, max: 100 }).withMessage('El nombre debe tener entre 2 y 100 caracteres'),

  body('descripcion')
    .optional()
    .isLength({ max: 1000 }).withMessage('La descripción no puede exceder los 1000 caracteres'),

  body('precio')
    .notEmpty().withMessage('El precio es obligatorio')
    .isDecimal().withMessage('El precio debe ser decimal'),

  body('stock')
    .notEmpty().withMessage('El stock es obligatorio')
    .isInt({ min: 0 }).withMessage('El stock debe ser un entero >= 0'),

  body('categoriaId')
    .notEmpty().withMessage('La categoría es obligatoria')
    .isInt({ min: 1 }).withMessage('La categoría debe ser un id válido')
    .bail()
    .custom(async (value) => {
      const categoria = await Categoria.findByPk(value);
      if (!categoria) return Promise.reject('La categoría seleccionada no existe');
    }),
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

module.exports = { sanitizeFormData, validateProductoBody, validateIdParam, handleValidation };

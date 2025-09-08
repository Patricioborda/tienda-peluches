const { body, param, validationResult } = require('express-validator');
const Categoria = require('../../Categorias/models/Categoria');

const validateProductoBody = [
  body('nombre')
    .trim()
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

  body('imagen')
    .optional({ nullable: true, checkFalsy: true })
    .isURL().withMessage('La imagen debe ser una URL válida'),

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

module.exports = { validateProductoBody, validateIdParam, handleValidation };

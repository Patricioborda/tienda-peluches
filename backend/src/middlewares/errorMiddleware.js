// Middleware para rutas no encontradas
const notFound = (req, res, next) => {
  const error = new Error(`Ruta no encontrada - ${req.originalUrl}`);
  error.statusCode = 404;
  next(error);
};

// Middleware para manejo de errores
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log del error para debugging
  console.error('❌ Error:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    body: req.body,
    timestamp: new Date().toISOString(),
  });

  // Errores Sequelize
  if (err.name === 'SequelizeValidationError') {
    const message = err.errors.map(e => e.message).join(', ');
    error = { message: `Errores de validación: ${message}`, statusCode: 400 };
  }

  if (err.name === 'SequelizeUniqueConstraintError') {
    error = { message: 'Recurso duplicado', statusCode: 400 };
  }

  if (err.name === 'SequelizeForeignKeyConstraintError') {
    error = { message: 'Referencia inválida', statusCode: 400 };
  }

  // Error JSON inválido
  if (err.type === 'entity.parse.failed') {
    error = { message: 'JSON inválido en el cuerpo de la petición', statusCode: 400 };
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: error.message || 'Error interno del servidor',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
  });
};

module.exports = { notFound, errorHandler };

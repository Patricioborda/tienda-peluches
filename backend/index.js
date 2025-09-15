require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

const routes = require('./src/routes');
const categoriasRoutes = require('./src/modules/Categorias/routes/categoriasRoutes');
const { errorHandler, notFound } = require('./src/middlewares/errorMiddleware');
const { connectDatabase } = require('./src/utils/database');

const app = express();
const PORT = process.env.PORT || 4000;

// CORS
const allowedOrigins =
  process.env.NODE_ENV === 'production'
    ? [process.env.FRONTEND_URL]
    : ['http://localhost', 'http://localhost:3000', 'http://frontend:80'];

app.use(cors({ origin: allowedOrigins, credentials: true }));
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'Productos API funcionando correctamente',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV,
  });
});

// Rutas principales
app.use('/api', routes);
app.use('/api/categorias', categoriasRoutes);

// Not found + manejo de errores
app.use(notFound);
app.use(errorHandler);

// Boot
(async () => {
  try {
    await connectDatabase();
    app.listen(PORT, '0.0.0.0', () => {
      console.log(`🛍️ Productos API corriendo en puerto ${PORT}`);
      console.log(`🌍 Entorno: ${process.env.NODE_ENV}`);
      console.log(`📊 Base de datos: ${process.env.DB_HOST}:${process.env.DB_PORT || 3306}/${process.env.DB_NAME}`);
    });
  } catch (err) {
    console.error('❌ Error al iniciar la API:', err.message);
  }
})();

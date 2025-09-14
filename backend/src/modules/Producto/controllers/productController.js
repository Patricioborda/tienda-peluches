const service = require('../services/productService');
const cloudinary = require('../../../utils/cloudinary');
const streamifier = require('streamifier');

// Listar todos los productos
exports.getProductos = async (req, res, next) => {
  try {
    const data = await service.list();
    res.json(data);
  } catch (err) {
    console.error('Error listando productos:', err);
    next(err);
  }
};

// Obtener un producto por ID
exports.getProducto = async (req, res, next) => {
  try {
    const data = await service.get(parseInt(req.params.id, 10));
    res.json(data);
  } catch (err) {
    console.error('Error obteniendo producto:', err);
    next(err);
  }
};

// Crear un producto
exports.createProducto = async (req, res, next) => {
  try {
    const productoData = { ...req.body };

    if (req.file) {
      console.log('Subiendo imagen a peluches:', req.file.originalname);

      const uploadStream = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'peluches' }, // Carpeta donde se guardarán las imágenes
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const uploadedImage = await uploadStream();
      productoData.imagen = uploadedImage.secure_url;
    }

    const data = await service.create(productoData);
    res.status(201).json({ success: true, data });
  } catch (err) {
    console.error('Error creando producto:', err);
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
};

// Actualizar un producto
exports.updateProducto = async (req, res, next) => {
  try {
    const productoData = { ...req.body };

    if (req.file) {
      console.log('Actualizando imagen del producto:', req.file.originalname);

      const uploadStream = () =>
        new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'peluches' },
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          );
          streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

      const uploadedImage = await uploadStream();
      productoData.imagen = uploadedImage.secure_url;
    } else if (req.body.removeImage === 'true') {
      console.log('Se eliminará la imagen del producto');
      productoData.imagen = null;
    }

    const data = await service.update(parseInt(req.params.id, 10), productoData);
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error actualizando producto:', err);
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
};

// Eliminar un producto
exports.deleteProducto = async (req, res, next) => {
  try {
    const data = await service.remove(parseInt(req.params.id, 10));
    res.json({ success: true, data });
  } catch (err) {
    console.error('Error eliminando producto:', err);
    res.status(err.statusCode || 500).json({ success: false, error: err.message });
  }
};

const repo = require('../repositories/productRepository');
const Categoria = require('../../Categorias/models/Categoria');

const list = () => repo.getAll();

const get = async (id) => {
  const entity = await repo.getById(id);
  if (!entity) {
    const error = new Error('Producto no encontrado');
    error.statusCode = 404;
    throw error;
  }
  return entity;
};

const create = async (data) => {
  if (Number(data.precio) < 0) throw Object.assign(new Error('El precio no puede ser negativo'), { statusCode: 400 });
  if (Number(data.stock) < 0) throw Object.assign(new Error('El stock no puede ser negativo'), { statusCode: 400 });

  const categoria = await Categoria.findByPk(data.categoriaId);
  if (!categoria) throw Object.assign(new Error('Categoría no válida'), { statusCode: 400 });

  return repo.create(data);
};

const update = async (id, data) => {
  const entity = await get(id);

  if (data.precio && Number(data.precio) < 0) throw Object.assign(new Error('El precio no puede ser negativo'), { statusCode: 400 });
  if (data.stock && Number(data.stock) < 0) throw Object.assign(new Error('El stock no puede ser negativo'), { statusCode: 400 });

  if (data.categoriaId) {
    const categoria = await Categoria.findByPk(data.categoriaId);
    if (!categoria) throw Object.assign(new Error('Categoría no válida'), { statusCode: 400 });
  }

  return repo.update(entity, data);
};

const remove = async (id) => {
  const entity = await get(id);
  await repo.remove(entity);
  return { message: 'Producto eliminado correctamente' };
};

module.exports = { list, get, create, update, remove };

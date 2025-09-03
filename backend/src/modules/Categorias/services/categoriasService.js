// backend/src/modules/Categorias/services/categoriaService.js
const repo = require('../repositories/categoriaRepository');

const list = () => repo.getAll();

const get = async (id) => {
  const entity = await repo.getById(id);
  if (!entity) {
    const error = new Error('Categoría no encontrada');
    error.statusCode = 404;
    throw error;
  }
  return entity;
};

const create = async (data) => {
  if (!data.nombre || data.nombre.trim() === '') {
    const e = new Error('El nombre de la categoría es obligatorio');
    e.statusCode = 400;
    throw e;
  }
  return repo.create(data);
};

const update = async (id, data) => {
  const entity = await get(id);
  return repo.update(entity, data);
};

const remove = async (id) => {
  const entity = await get(id);
  await repo.remove(entity);
  return { message: 'Categoría eliminada correctamente' };
};

module.exports = { list, get, create, update, remove };

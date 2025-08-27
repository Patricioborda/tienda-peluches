const repo = require('../repositories/pelucheRepository');

const list = () => repo.getAll();

const get = async (id) => {
  const entity = await repo.getById(id);
  if (!entity) {
    const error = new Error('Peluche no encontrado');
    error.statusCode = 404;
    throw error;
  }
  return entity;
};

const create = async (data) => {
  // Reglas de negocio de ejemplo
  if (Number(data.precio) < 0) {
    const e = new Error('El precio no puede ser negativo');
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
  return { message: 'Peluche eliminado correctamente' };
};

module.exports = { list, get, create, update, remove };

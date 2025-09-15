import api from './api.js';

export const getCategorias = async () => {
  const response = await api.get('/categorias');
  return response.data;
};

export const createCategoria = async (data) => {
  const response = await api.post('/categorias', data);
  return response.data;
};

export const updateCategoria = async (id, data) => {
  const response = await api.put(`/categorias/${id}`, data);
  return response.data;
};

export const deleteCategoria = async (id) => {
  const response = await api.delete(`/categorias/${id}`);
  return response.data;
};

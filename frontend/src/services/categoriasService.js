// frontend/src/services/categoriasService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getCategorias = async () => {
  const response = await axios.get(`${API_URL}/categorias`);
  return response.data;
};

export const createCategoria = async (data) => {
  const response = await axios.post(`${API_URL}/categorias`, data);
  return response.data;
};

export const updateCategoria = async (id, data) => {
  const response = await axios.put(`${API_URL}/categorias/${id}`, data);
  return response.data;
};

export const deleteCategoria = async (id) => {
  const response = await axios.delete(`${API_URL}/categorias/${id}`);
  return response.data;
};

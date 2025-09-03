import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getCategorias = async () => {
  try {
    const response = await axios.get(`${API_URL}/categorias`);
    return response.data;
  } catch (error) {
    console.error('Error al obtener categorías:', error);
    throw error;
  }
};

export const createCategoria = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/categorias`, data);
    return response.data;
  } catch (error) {
    console.error('Error al crear categoría:', error);
    throw error;
  }
};

export const updateCategoria = async (id, data) => {
  try {
    const response = await axios.put(`${API_URL}/categorias/${id}`, data);
    return response.data;
  } catch (error) {
    console.error('Error al actualizar categoría:', error);
    throw error;
  }
};

export const deleteCategoria = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/categorias/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error al eliminar categoría:', error);
    throw error;
  }
};

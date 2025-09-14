import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getProductos = async () => {
  try {
    const res = await axios.get(`${API_URL}/productos`);
    return res.data;
  } catch (error) {
    console.error('Error al traer productos:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    await axios.delete(`${API_URL}/productos/${id}`);
  } catch (error) {
    console.error('Error al eliminar producto:', error.response?.data || error.message);
    throw error;
  }
};

export const createProducto = async (productoData) => {
  try {
    const res = await axios.post(`${API_URL}/productos`, productoData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (error) {
    console.error('Error al crear producto:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProducto = async (id, productoData) => {
  try {
    const res = await axios.put(`${API_URL}/productos/${id}`, productoData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error.response?.data || error.message);
    throw error;
  }
};

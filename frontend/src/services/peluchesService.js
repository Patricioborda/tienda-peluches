// frontend/src/services/peluchesService.js
import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getPeluches = async () => {
  try {
    const res = await axios.get(`${API_URL}/peluches`);
    return res.data;
  } catch (error) {
    console.error('Error al traer peluches:', error);
    throw error;
  }
};

export const deletePeluche = async (id) => {
  try {
    await axios.delete(`${API_URL}/peluches/${id}`);
  } catch (error) {
    console.error('Error al eliminar peluche:', error);
    throw error;
  }
};

export const createPeluche = async (pelucheData) => {
  try {
    const res = await axios.post(`${API_URL}/peluches`, pelucheData);
    return res.data;
  } catch (error) {
    console.error('Error al crear peluche:', error);
    throw error;
  }
};

export const updatePeluche = async (id, data) => {
  try {
    const res = await axios.put(`${API_URL}/peluches/${id}`, data);
    return res.data;
  } catch (error) {
    console.error('Error al actualizar peluche:', error);
    throw error;
  }
};

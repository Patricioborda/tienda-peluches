import api from './api.js';

export const getProductos = async () => {
  try {
    const res = await api.get('/productos'); // queda /api/productos
    return res.data;
  } catch (error) {
    console.error('Error al traer productos:', error.response?.data || error.message);
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    await api.delete(`/productos/${id}`);
  } catch (error) {
    console.error('Error al eliminar producto:', error.response?.data || error.message);
    throw error;
  }
};

export const createProducto = async (productoData) => {
  try {
    const res = await api.post('/productos', productoData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (error) {
    console.error('Error al crear producto:', error.response?.data || error.message);
    throw error;
  }
};

export const updateProducto = async (id, productoData) => {
  try {
    const res = await api.put(`/productos/${id}`, productoData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error.response?.data || error.message);
    throw error;
  }
};

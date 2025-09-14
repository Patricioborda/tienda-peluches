import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const getProductos = async () => {
  try {
    const res = await axios.get(`${API_URL}/productos`);
    return res.data;
  } catch (error) {
    console.error('Error al traer productos:', error);
    throw error;
  }
};

export const deleteProducto = async (id) => {
  try {
    await axios.delete(`${API_URL}/productos/${id}`);
  } catch (error) {
    console.error('Error al eliminar producto:', error);
    throw error;
  }
};

// Usamos FormData para enviar multipart/form-data
export const createProducto = async (productoData) => {
  try {
    const formData = new FormData();
    formData.append('nombre', productoData.nombre);
    formData.append('descripcion', productoData.descripcion || '');
    formData.append('precio', productoData.precio);
    formData.append('stock', productoData.stock);
    formData.append('categoriaId', productoData.categoriaId);

    if (productoData.imagen) {
      formData.append('imagen', productoData.imagen); // File object
    }

    const res = await axios.post(`${API_URL}/productos`, formData, {
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
    const formData = new FormData();
    formData.append('nombre', productoData.nombre);
    formData.append('descripcion', productoData.descripcion || '');
    formData.append('precio', productoData.precio);
    formData.append('stock', productoData.stock);
    formData.append('categoriaId', productoData.categoriaId);

    if (productoData.imagen instanceof File) {
      formData.append('imagen', productoData.imagen);
    } else if (productoData.imagen === null) {
      formData.append('removeImage', true);
    }

    const res = await axios.put(`${API_URL}/productos/${id}`, formData, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return res.data;
  } catch (error) {
    console.error('Error al actualizar producto:', error.response?.data || error.message);
    throw error;
  }
};

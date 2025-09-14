import React, { useState, useEffect } from 'react';
import { createProducto, updateProducto } from '../services/productoService.js';
import { getCategorias } from '../services/categoriasService.js';
import '../styles/ProductoForm.scss';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const ProductoForm = ({ isActive, onClose, onSuccess, producto }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    categoriaId: '',
    imagen: null
  });
  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [preview, setPreview] = useState(null);

  useEffect(() => { fetchCategorias(); }, []);

  useEffect(() => {
    if (producto) {
      setFormData({
        nombre: producto.nombre || '',
        descripcion: producto.descripcion || '',
        precio: producto.precio || '',
        stock: producto.stock || '',
        categoriaId: producto.categoriaId || '',
        imagen: null
      });
      setPreview(producto.imagen || null);
    } else {
      setFormData({ nombre: '', descripcion: '', precio: '', stock: '', categoriaId: '', imagen: null });
      setPreview(null);
    }
  }, [producto]);

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imagen: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, imagen: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => { e.preventDefault(); };

  const handleRemoveImage = () => {
    setFormData(prev => ({ ...prev, imagen: null }));
    setPreview(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.nombre.trim()) return Swal.fire({ icon: 'warning', title: 'Nombre requerido', confirmButtonColor: '#0A2A43' });
    if (!formData.precio || parseFloat(formData.precio) <= 0) return Swal.fire({ icon: 'warning', title: 'Precio inválido', confirmButtonColor: '#0A2A43' });
    if (!formData.stock || parseInt(formData.stock) < 0) return Swal.fire({ icon: 'warning', title: 'Stock inválido', confirmButtonColor: '#0A2A43' });
    if (!formData.categoriaId) return Swal.fire({ icon: 'warning', title: 'Categoría requerida', confirmButtonColor: '#0A2A43' });

    setIsLoading(true);

    try {
      const dataToSend = new FormData();
      dataToSend.append('nombre', formData.nombre.trim());
      dataToSend.append('descripcion', formData.descripcion.trim() || '');
      dataToSend.append('precio', parseFloat(formData.precio));
      dataToSend.append('stock', parseInt(formData.stock));
      dataToSend.append('categoriaId', parseInt(formData.categoriaId));

      // Adjunta la imagen si hay, o marca para remover si se quitó
      if (formData.imagen) dataToSend.append('imagen', formData.imagen);
      else if (producto && !preview) dataToSend.append('removeImage', true);

      if (producto) {
        await updateProducto(producto.id, dataToSend);
        Swal.fire({ icon: 'success', title: '¡Actualizado!', confirmButtonColor: '#0A2A43' });
      } else {
        await createProducto(dataToSend);
        Swal.fire({ icon: 'success', title: '¡Creado!', confirmButtonColor: '#0A2A43' });
      }

      onSuccess();
      onClose();
    } catch (error) {
      Swal.fire({ icon: 'error', title: 'Error guardando producto', confirmButtonColor: '#0A2A43' });
      console.error('Error al guardar producto:', error.response?.data || error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`modal-overlay ${isActive ? 'active' : ''}`}>
      <div className="modal-content">
        <h2>{producto ? 'Editar Producto' : 'Agregar Producto'}</h2>
        <form className="producto-form" onSubmit={handleSubmit}>
          <input type="text" name="nombre" placeholder="Nombre del producto" value={formData.nombre} onChange={handleChange} required disabled={isLoading} />
          <textarea name="descripcion" placeholder="Descripción del producto" value={formData.descripcion} onChange={handleChange} rows="3" disabled={isLoading} />

          <div className="form-row">
            <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleChange} step="0.01" min="0" required disabled={isLoading} />
            <input type="number" name="stock" placeholder="Stock" value={formData.stock} onChange={handleChange} min="0" required disabled={isLoading} />
          </div>

          <select name="categoriaId" value={formData.categoriaId} onChange={handleChange} required disabled={isLoading}>
            <option value="">Seleccionar categoría</option>
            {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
          </select>

          <div className="file-dropzone" onDrop={handleDrop} onDragOver={handleDragOver}>
            {preview ? <img src={preview} alt="Preview" className="image-preview" /> : <p>Arrastra una imagen o haz click para seleccionar</p>}
            <input type="file" accept="image/*" onChange={handleFileChange} disabled={isLoading} />
          </div>

          {preview && <button type="button" className="btn-remove-image" onClick={handleRemoveImage} disabled={isLoading}>Quitar imagen</button>}

          <div className="form-actions">
            <button type="submit" className="btn btn-save" disabled={isLoading}>
              {isLoading ? 'Guardando...' : (producto ? 'Actualizar' : 'Crear')}
            </button>
            <button type="button" className="btn btn-cancel" onClick={onClose} disabled={isLoading}>Cancelar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductoForm;

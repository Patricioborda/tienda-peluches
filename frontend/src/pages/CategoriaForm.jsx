import React, { useState, useEffect } from 'react';
import { createCategoria, updateCategoria } from '../services/categoriasService.js';
import '../styles/CategoriaForm.scss';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const CategoriaForm = ({ isActive, onClose, onSuccess, categoria }) => {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre);
    } else {
      setNombre('');
    }
  }, [categoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return;

    try {
      if (categoria) {
        await updateCategoria(categoria.id, { nombre });
        Swal.fire({
          icon: 'success',
          title: '¡Actualizado!',
          text: 'La categoría se ha actualizado correctamente.',
          confirmButtonColor: '#0A2A43'
        });
      } else {
        await createCategoria({ nombre });
        Swal.fire({
          icon: 'success',
          title: '¡Creado!',
          text: 'La categoría se ha creado correctamente.',
          confirmButtonColor: '#0A2A43'
        });
      }
      onSuccess();
      onClose();
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Hubo un error guardando la categoría.',
        confirmButtonColor: '#0A2A43'
      });
      console.error(error);
    }
  };

  return (
    <div className={`modal-overlay ${isActive ? 'active' : ''}`}>
      <div className="modal-content">
        <h2>{categoria ? 'Editar Categoría' : 'Agregar Categoría'}</h2>
        <form className="categoria-form" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <div className="form-actions">
            <button type="submit" className="btn btn-save">
              {categoria ? 'Actualizar' : 'Crear'}
            </button>
            <button type="button" className="btn btn-cancel" onClick={onClose}>
              Cancelar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CategoriaForm;

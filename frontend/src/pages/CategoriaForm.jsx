import React, { useState, useEffect } from 'react';
import { createCategoria, updateCategoria } from '../services/categoriasService.js';
import '../styles/CategoriaForm.scss';

const CategoriaForm = ({ onClose, onSuccess, categoria }) => {
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
    try {
      if (categoria) {
        await updateCategoria(categoria.id, { nombre });
      } else {
        await createCategoria({ nombre });
      }
      onSuccess();
      onClose();
    } catch (error) {
      alert('Error guardando categoría');
      console.error(error);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{categoria ? 'Editar Categoría' : 'Agregar Categoría'}</h2>
        <form onSubmit={handleSubmit} className="categoria-form">
          <input
            type="text"
            placeholder="Nombre de la categoría"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            required
          />
          <div className="form-actions">
            <button type="submit" className="btn btn-save">
              {categoria ? 'Guardar Cambios' : 'Crear Categoría'}
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

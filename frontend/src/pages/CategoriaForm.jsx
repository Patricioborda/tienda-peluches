// frontend/src/pages/CategoriaForm.jsx
import React, { useState, useEffect } from 'react';
import { createCategoria, updateCategoria } from '../services/categoriasService.js';
import '../styles/CategoriaForm.scss';

const CategoriaForm = ({ categoria, onSuccess }) => {
  const [nombre, setNombre] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (categoria) {
      setNombre(categoria.nombre);
    } else {
      setNombre('');
    }
  }, [categoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) {
      alert('El nombre es obligatorio');
      return;
    }
    setLoading(true);
    try {
      if (categoria) {
        await updateCategoria(categoria.id, { nombre });
      } else {
        await createCategoria({ nombre });
      }
      onSuccess();
      setNombre('');
    } catch (error) {
      alert('Error guardando categoría');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form className="categoria-form" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nombre de la categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button type="submit" disabled={loading}>
        {categoria ? 'Actualizar' : 'Crear'}
      </button>
    </form>
  );
};

export default CategoriaForm;

import React, { useState, useEffect } from 'react';
import { createCategoria, updateCategoria } from '../services/categoriasService';

const CategoriaForm = ({ categoria, onSuccess }) => {
  const [nombre, setNombre] = useState('');

  useEffect(() => {
    if (categoria) setNombre(categoria.nombre);
  }, [categoria]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre.trim()) return alert('El nombre es obligatorio');

    try {
      if (categoria) {
        await updateCategoria(categoria.id, { nombre });
        alert('Categoría actualizada correctamente');
      } else {
        await createCategoria({ nombre });
        alert('Categoría creada correctamente');
      }
      setNombre('');
      onSuccess();
    } catch (error) {
      alert('Error al guardar la categoría');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="categoria-form">
      <input
        type="text"
        placeholder="Nombre de la categoría"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
      />
      <button type="submit">{categoria ? 'Actualizar' : 'Crear'}</button>
    </form>
  );
};

export default CategoriaForm;

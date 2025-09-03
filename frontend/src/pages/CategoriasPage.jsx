// frontend/src/pages/CategoriasPage.jsx
import React, { useEffect, useState } from 'react';
import { getCategorias, deleteCategoria } from '../services/categoriasService.js';
import CategoriaForm from './CategoriaForm.jsx';
import '../styles/CategoriasPage.scss';

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [editCategoria, setEditCategoria] = useState(null);

  const fetchCategorias = async () => {
    try {
      setLoading(true);
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      alert('Error cargando categorías');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro que deseas eliminar esta categoría?')) return;
    try {
      await deleteCategoria(id);
      fetchCategorias();
    } catch (error) {
      alert('Error eliminando categoría');
      console.error(error);
    }
  };

  const categoriasFiltradas = categorias.filter(c =>
    c.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  return (
    <div className="categorias-page">
      <h1>Categorías</h1>

      <input
        type="text"
        placeholder="Filtrar por nombre..."
        value={filtro}
        onChange={(e) => setFiltro(e.target.value)}
        className="filtro-input"
      />

      <CategoriaForm
        key={editCategoria ? editCategoria.id : 'new'}
        categoria={editCategoria}
        onSuccess={() => {
          setEditCategoria(null);
          fetchCategorias();
        }}
      />

      {loading ? (
        <p>Cargando categorías...</p>
      ) : categoriasFiltradas.length === 0 ? (
        <p>No se encontraron categorías</p>
      ) : (
        <ul className="categorias-list">
          {categoriasFiltradas.map((categoria) => (
            <li key={categoria.id} className="categoria-card">
              <span>{categoria.nombre}</span>
              <div className="actions">
                <button onClick={() => setEditCategoria(categoria)}>Editar</button>
                <button onClick={() => handleDelete(categoria.id)}>Eliminar</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default CategoriasPage;

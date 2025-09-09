import React, { useEffect, useState } from 'react';
import { getCategorias, deleteCategoria } from '../services/categoriasService.js';
import CategoriaForm from './CategoriaForm.jsx';
import '../styles/CategoriasPage.scss';

const CategoriasPage = () => {
  const [categorias, setCategorias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoria, setSelectedCategoria] = useState(null);

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

  const openModal = (categoria = null) => {
    setSelectedCategoria(categoria);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedCategoria(null);
    setShowModal(false);
  };

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

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <p>Cargando categorías...</p>
      </div>
    );
  }

  return (
    <div className="categorias-page">
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="page-title">Categorías</h1>
            <p className="page-description">Gestión de categorías de tu tienda</p>
          </div>
          <button className="btn btn-add" onClick={() => openModal()}>
            + Agregar categoría
          </button>
        </div>
      </div>

      <div className="categorias-list-container">
        {/* 🔍 Input de filtro */}
        <input
          type="text"
          placeholder="Filtrar por nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="filtro-input"
        />

        {/* 🟢 Caso 1: No hay ninguna categoría en la base */}
        {categorias.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h2 className="empty-title">No hay categorías</h2>
            <p className="empty-description">Agrega una categoría para comenzar.</p>
          </div>
        ) : categoriasFiltradas.length === 0 ? (
          /* 🟡 Caso 2: Hay categorías pero el filtro no encontró nada */
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h2 className="empty-title">Sin resultados</h2>
            <p className="empty-description">No se encontraron categorías que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          /* 🟢 Caso 3: Mostrar categorías filtradas */
          <ul className="categorias-list">
            {categoriasFiltradas.map((categoria) => (
              <li key={categoria.id} className="categoria-card">
                <span>{categoria.nombre}</span>
                <div className="actions">
                  <button className="btn btn-edit" onClick={() => openModal(categoria)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(categoria.id)}>Eliminar</button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>

      {showModal && (
        <CategoriaForm
          onClose={closeModal}
          onSuccess={fetchCategorias}
          categoria={selectedCategoria}
        />
      )}
    </div>
  );
};

export default CategoriasPage;

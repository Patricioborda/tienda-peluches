import React, { useEffect, useState } from 'react';
import { getCategorias, deleteCategoria } from '../services/categoriasService.js';
import CategoriaForm from './CategoriaForm.jsx';
import '../styles/CategoriasPage.scss';
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

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
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error cargando categorías',
        confirmButtonColor: '#0A2A43'
      });
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
    const result = await Swal.fire({
      title: '¿Seguro que deseas eliminar esta categoría?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0A2A43',
      cancelButtonColor: '#B22222',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      await deleteCategoria(id);
      fetchCategorias();
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'La categoría se ha eliminado correctamente.',
        confirmButtonColor: '#0A2A43'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error eliminando categoría',
        confirmButtonColor: '#0A2A43'
      });
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
        <input
          type="text"
          placeholder="Filtrar por nombre..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="filtro-input"
        />

        {categorias.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📂</div>
            <h2 className="empty-title">No hay categorías</h2>
            <p className="empty-description">Agrega una categoría para comenzar.</p>
          </div>
        ) : categoriasFiltradas.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h2 className="empty-title">Sin resultados</h2>
            <p className="empty-description">No se encontraron categorías que coincidan con tu búsqueda.</p>
          </div>
        ) : (
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

      {/* Modal siempre presente en el DOM */}
      <CategoriaForm
        isActive={showModal}
        onClose={closeModal}
        onSuccess={fetchCategorias}
        categoria={selectedCategoria}
      />
    </div>
  );
};

export default CategoriasPage;

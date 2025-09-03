// src/pages/PeluchesPage.jsx
import React, { useState, useEffect } from "react";
import { getPeluches, deletePeluche } from "../services/peluchesService.js";
import Swal from "sweetalert2";
import CreatePeluchePage from "./CreatePeluchePage.jsx";
import '../styles/PeluchesPage.scss';

function PeluchesPage() {
  const [peluches, setPeluches] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("nombre");

  useEffect(() => { fetchPeluches(); }, []);

  const fetchPeluches = async () => {
    try {
      setLoading(true);
      const data = await getPeluches();
      setPeluches(data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "No se pudieron cargar los peluches", "error");
    } finally { setLoading(false); }
  };

  const handleDelete = async (id, nombre) => {
    const result = await Swal.fire({
      title: "¿Estás seguro?",
      text: `Se eliminará "${nombre}" permanentemente`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#ef4444",
      cancelButtonColor: "#6b7280",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar",
      reverseButtons: true
    });

    if (result.isConfirmed) {
      try {
        await deletePeluche(id);
        Swal.fire({ title: "¡Eliminado!", text: "El peluche ha sido eliminado correctamente", icon: "success", timer: 2000, showConfirmButton: false });
        fetchPeluches();
      } catch (err) {
        Swal.fire("Error", "No se pudo eliminar el peluche", "error");
      }
    }
  };

  const handleEdit = (peluche) => {
    Swal.fire({
      title: "Editar Peluche",
      text: `Función de edición para "${peluche.nombre}" - Próximamente`,
      icon: "info",
      confirmButtonText: "Entendido"
    });
  };

  // Filtrado seguro
  const getFilteredAndSortedPeluches = () => {
    let filtered = peluches.filter(peluche => {
      const nombre = peluche.nombre?.toLowerCase() || "";
      const descripcion = peluche.descripcion?.toLowerCase() || "";
      const categoria = peluche.categoria?.nombre?.toLowerCase() || "";
      return nombre.includes(searchTerm.toLowerCase()) || descripcion.includes(searchTerm.toLowerCase()) || categoria.includes(searchTerm.toLowerCase());
    });

    filtered.sort((a, b) => {
      switch (sortBy) {
        case "precio": return parseFloat(a.precio) - parseFloat(b.precio);
        case "stock": return parseInt(a.stock) - parseInt(b.stock);
        case "categoria": return (a.categoria?.nombre || "").localeCompare(b.categoria?.nombre || "");
        default: return (a.nombre || "").localeCompare(b.nombre || "");
      }
    });

    return filtered;
  };

  const filteredPeluches = getFilteredAndSortedPeluches();

  const totalStock = peluches.reduce((sum, p) => sum + (p.stock || 0), 0);
  const valorTotal = peluches.reduce((sum, p) => sum + ((p.precio || 0) * (p.stock || 0)), 0);
  const stockBajo = peluches.filter(p => (p.stock || 0) <= 5).length;

  if (loading) return (
    <div className="peluches-page">
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <p>Cargando peluches...</p>
      </div>
    </div>
  );

  return (
    <div className="peluches-page">
      {/* Header */}
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="page-title"><span className="title-icon">🧸</span>Gestión de Peluches</h1>
            <p className="page-description">Administra tu inventario de peluches de forma fácil y eficiente</p>
          </div>
          <button className="btn btn-add" onClick={() => setShowModal(true)}>
            <span className="btn-icon">+</span>Agregar Peluche
          </button>
        </div>
      </div>

      {/* Estadísticas */}
      <div className="stats-container">
        <div className="stat-card"><div className="stat-icon">📦</div><div className="stat-info"><span className="stat-number">{peluches.length}</span><span className="stat-label">Total Peluches</span></div></div>
        <div className="stat-card"><div className="stat-icon">🔢</div><div className="stat-info"><span className="stat-number">{totalStock}</span><span className="stat-label">Stock Total</span></div></div>
        <div className="stat-card"><div className="stat-icon">💰</div><div className="stat-info"><span className="stat-number">${valorTotal.toFixed(2)}</span><span className="stat-label">Valor Inventario</span></div></div>
        <div className={`stat-card ${stockBajo > 0 ? 'warning' : ''}`}><div className="stat-icon">⚠️</div><div className="stat-info"><span className="stat-number">{stockBajo}</span><span className="stat-label">Stock Bajo</span></div></div>
      </div>

      {/* Controles búsqueda y orden */}
      <div className="controls-container">
        <div className="search-container">
          <div className="search-icon">🔍</div>
          <input type="text" placeholder="Buscar peluches..." value={searchTerm} onChange={e => setSearchTerm(e.target.value)} className="search-input"/>
        </div>
        <div className="sort-container">
          <label className="sort-label">Ordenar por:</label>
          <select value={sortBy} onChange={e => setSortBy(e.target.value)} className="sort-select">
            <option value="nombre">Nombre</option>
            <option value="precio">Precio</option>
            <option value="stock">Stock</option>
            <option value="categoria">Categoría</option>
          </select>
        </div>
      </div>

      {/* Lista de peluches */}
      {filteredPeluches.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">🧸</div>
          <h3 className="empty-title">{searchTerm ? "No se encontraron peluches" : "No hay peluches registrados"}</h3>
          <p className="empty-description">{searchTerm ? "Intenta con otros términos de búsqueda" : "¡Comienza agregando tu primer peluche a la colección!"}</p>
          {!searchTerm && <button className="btn btn-add" onClick={() => setShowModal(true)}><span className="btn-icon">+</span>Agregar Primer Peluche</button>}
        </div>
      ) : (
        <div className="peluches-grid">
          {filteredPeluches.map(peluche => (
            <div key={peluche.id} className="peluche-card">
              <div className="card-image-container">
                <img
                  src={peluche.imagen || "https://via.placeholder.com/400x300/af3f4f6/9ca3af?text=Sin+Imagen"}
                  alt={peluche.nombre}
                  className="card-image"
                  onError={(e) => {
                    if (e.target.dataset.errorHandled) return;
                    e.target.dataset.errorHandled = true;
                    e.target.src = "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='300' viewBox='0 0 400 300'%3E%3Crect width='400' height='300' fill='%23f3f4f6'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' fill='%239ca3af' font-family='system-ui' font-size='18'%3ESin Imagen%3C/text%3E%3C/svg%3E";
                  }}
                />
                <div className={`stock-badge ${(peluche.stock || 0) > 10 ? 'high' : (peluche.stock || 0) > 5 ? 'medium' : (peluche.stock || 0) > 0 ? 'low' : 'empty'}`}>
                  Stock: {peluche.stock || 0}
                </div>
              </div>

              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{peluche.nombre}</h3>
                  <div className="card-price">${peluche.precio || 0}</div>
                </div>

                <p className="card-description">{peluche.descripcion || "Sin descripción"}</p>

                <div className="card-category">
                  <span className="category-tag">
                    <span className="category-icon">🏷️</span>
                    {peluche.categoria?.nombre || "Sin categoría"}
                  </span>
                </div>

                <div className="card-actions">
                  <button onClick={() => handleEdit(peluche)} className="btn btn-edit"><span className="btn-icon">✏️</span>Editar</button>
                  <button onClick={() => handleDelete(peluche.id, peluche.nombre)} className="btn btn-delete"><span className="btn-icon">🗑️</span>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <CreatePeluchePage
          onClose={() => setShowModal(false)}
          onSuccess={() => { fetchPeluches(); Swal.fire({ title: "¡Éxito!", text: "Peluche creado correctamente", icon: "success", timer: 2000, showConfirmButton: false }); }}
        />
      )}
    </div>
  );
}

export default PeluchesPage;

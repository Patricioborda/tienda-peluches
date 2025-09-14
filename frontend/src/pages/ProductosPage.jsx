import React, { useEffect, useState } from 'react';
import { getProductos, deleteProducto } from '../services/productoService.js';
import ProductoForm from './ProductoForm.jsx';
import "../styles/ProductosPage.scss";
import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.min.css';

const ProductosPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filtro, setFiltro] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(data);
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error cargando productos',
        confirmButtonColor: '#0A2A43'
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  const openModal = (producto = null) => {
    setSelectedProducto(producto);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProducto(null);
    setShowModal(false);
  };

  const handleDelete = async (id, nombre) => {
    const result = await Swal.fire({
      title: `¿Seguro que deseas eliminar "${nombre}"?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#0A2A43',
      cancelButtonColor: '#B22222',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (!result.isConfirmed) return;

    try {
      await deleteProducto(id);
      fetchProductos();
      Swal.fire({
        icon: 'success',
        title: '¡Eliminado!',
        text: 'El producto se ha eliminado correctamente.',
        confirmButtonColor: '#0A2A43'
      });
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Error eliminando producto',
        confirmButtonColor: '#0A2A43'
      });
      console.error(error);
    }
  };

  const productosFiltrados = productos.filter(p =>
    p.nombre.toLowerCase().includes(filtro.toLowerCase()) ||
    p.categoria?.nombre.toLowerCase().includes(filtro.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="productos-page">
      <div className="page-header">
        <div className="header-content">
          <div className="header-text">
            <h1 className="page-title">Productos</h1>
            <p className="page-description">Gestión de productos de tu tienda</p>
          </div>
          <button className="btn btn-add" onClick={() => openModal()}>
            + Agregar producto
          </button>
        </div>
      </div>

      <div className="productos-list-container">
        <input
          type="text"
          placeholder="Filtrar por nombre o categoría..."
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          className="filtro-input"
        />

        {productos.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📦</div>
            <h2 className="empty-title">No hay productos</h2>
            <p className="empty-description">Agrega un producto para comenzar.</p>
          </div>
        ) : productosFiltrados.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">🔍</div>
            <h2 className="empty-title">Sin resultados</h2>
            <p className="empty-description">No se encontraron productos que coincidan con tu búsqueda.</p>
          </div>
        ) : (
          <div className="productos-grid">
            {productosFiltrados.map((producto) => (
              <div key={producto.id} className="producto-card">
                <div className="producto-image">
                  <img
                    src={producto.imagen || "/images/default.png"}
                    alt={producto.nombre}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "/images/default.png";
                    }}
                  />
                  <div className={`stock-badge ${
                    producto.stock > 10 ? 'high' : 
                    producto.stock > 5 ? 'medium' : 
                    producto.stock > 0 ? 'low' : 'empty'
                  }`}>
                    Stock: {producto.stock}
                  </div>
                </div>
                
                <div className="producto-info">
                  <div className="producto-header">
                    <h3 className="producto-nombre">{producto.nombre}</h3>
                    <span className="producto-precio">${producto.precio}</span>
                  </div>
                  
                  <p className="producto-descripcion">
                    {producto.descripcion || "Sin descripción"}
                  </p>
                  
                  <div className="producto-categoria">
                    <span className="categoria-tag">
                      {producto.categoria?.nombre || "Sin categoría"}
                    </span>
                  </div>
                  
                  <div className="actions">
                    <button 
                      className="btn btn-edit" 
                      onClick={() => openModal(producto)}
                    >
                      Editar
                    </button>
                    <button 
                      className="btn btn-delete" 
                      onClick={() => handleDelete(producto.id, producto.nombre)}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <ProductoForm
        isActive={showModal}
        onClose={closeModal}
        onSuccess={fetchProductos}
        producto={selectedProducto}
      />
    </div>
  );
};

export default ProductosPage;

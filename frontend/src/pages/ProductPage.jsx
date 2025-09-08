import React, { useState, useEffect } from 'react';
import { getProductos, deleteProducto } from '../services/productoService';
import '../styles/ProductPage.scss';
import CreateProductoPage from './CreateProductPage';

const ProductPage = () => {
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedProducto, setSelectedProducto] = useState(null);

  useEffect(() => {
    fetchProductos();
  }, []);

  const fetchProductos = async () => {
    try {
      setLoading(true);
      const data = await getProductos();
      setProductos(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (producto = null) => {
    setSelectedProducto(producto);
    setShowModal(true);
  };

  const closeModal = () => {
    setSelectedProducto(null);
    setShowModal(false);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('¿Seguro quieres eliminar este producto?')) return;
    try {
      await deleteProducto(id);
      fetchProductos();
    } catch (err) {
      console.error(err);
      alert('Error al eliminar producto');
    }
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner-large"></div>
        <p>Cargando productos...</p>
      </div>
    );
  }

  return (
    <div className="product-page">
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

      {productos.length === 0 ? (
        <div className="empty-state">
          <div className="empty-icon">😔</div>
          <h2 className="empty-title">No hay productos</h2>
          <p className="empty-description">Agrega un producto para comenzar.</p>
        </div>
      ) : (
        <div className="product-grid">
          {productos.map((p) => (
            <div key={p.id} className="product-card">
              <div className="card-image-container">
                <img src={p.imagen ? `/images/${p.imagen}` : '/images/default.png'} alt={p.nombre} className="card-image" onError={(e) => (e.target.src = '/images/default.png')}/>
                <div className={`stock-badge ${p.stock > 5 ? 'high' : p.stock > 2 ? 'medium' : p.stock > 0 ? 'low' : 'empty'}`}>
                  {p.stock > 0 ? p.stock : 'Agotado'}
                </div>
              </div>
              <div className="card-content">
                <div className="card-header">
                  <h3 className="card-title">{p.nombre}</h3>
                  <span className="card-price">${p.precio}</span>
                </div>
                <p className="card-description">{p.descripcion}</p>
                <div className="card-actions">
                  <button className="btn btn-edit" onClick={() => openModal(p)}>Editar</button>
                  <button className="btn btn-delete" onClick={() => handleDelete(p.id)}>Eliminar</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <CreateProductoPage
          onClose={closeModal}
          onSuccess={fetchProductos}
          producto={selectedProducto}
        />
      )}
    </div>
  );
};

export default ProductPage;

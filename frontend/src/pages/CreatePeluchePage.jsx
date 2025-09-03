// src/pages/CreatePeluchePage.jsx
import React, { useState, useEffect } from "react";
import { getCategorias } from "../services/categoriasService.js";
import { createPeluche } from "../services/peluchesService.js";
import '../styles/CreatePeluchePage.scss';

function CreatePeluchePage({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    categoriaId: "",
    imagen: "",
  });

  const [categorias, setCategorias] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (error) {
      console.error("Error al obtener categorías:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!form.nombre.trim()) newErrors.nombre = "El nombre es requerido";
    if (!form.precio || parseFloat(form.precio) <= 0) newErrors.precio = "El precio debe ser mayor a 0";
    if (!form.stock || parseInt(form.stock) < 0) newErrors.stock = "El stock debe ser mayor o igual a 0";
    if (!form.categoriaId) newErrors.categoriaId = "Debe seleccionar una categoría";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);

    try {
      const pelucheData = {
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim() || null,
        precio: parseFloat(form.precio),
        stock: parseInt(form.stock),
        categoriaId: parseInt(form.categoriaId),
        imagen: form.imagen.trim() || null,
      };

      console.log("Datos a enviar:", pelucheData);
      await createPeluche(pelucheData);

      onSuccess();
      onClose();
    } catch (error) {
      console.error("Error al crear peluche:", error.response?.data || error.message);
      alert(
        error.response?.data?.error
          ? `No se pudo crear el peluche: ${error.response.data.error}`
          : "No se pudo crear el peluche. Por favor, intente nuevamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="create-peluche-modal">
      <div className="modal-overlay" onClick={onClose}></div>
      <div className="modal-content">
        <div className="modal-header">
          <h2 className="modal-title">✨ Crear Nuevo Peluche</h2>
          <button onClick={onClose} className="close-button" disabled={isLoading}>✕</button>
        </div>

        <div className="modal-body">
          <form onSubmit={handleSubmit} className="peluche-form">
            <div className="form-group">
              <label className="form-label">🧸 Nombre del peluche</label>
              <input
                type="text"
                name="nombre"
                value={form.nombre}
                onChange={handleChange}
                className={`form-input ${errors.nombre ? 'has-error' : ''}`}
                disabled={isLoading}
              />
              {errors.nombre && <span className="error-message">{errors.nombre}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">📝 Descripción</label>
              <textarea
                name="descripcion"
                value={form.descripcion}
                onChange={handleChange}
                className="form-textarea"
                rows="3"
                disabled={isLoading}
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label className="form-label">💰 Precio</label>
                <input
                  type="number"
                  name="precio"
                  value={form.precio}
                  onChange={handleChange}
                  step="0.01"
                  min="0"
                  className={`form-input ${errors.precio ? 'has-error' : ''}`}
                  disabled={isLoading}
                />
                {errors.precio && <span className="error-message">{errors.precio}</span>}
              </div>

              <div className="form-group">
                <label className="form-label">📦 Stock</label>
                <input
                  type="number"
                  name="stock"
                  value={form.stock}
                  onChange={handleChange}
                  min="0"
                  className={`form-input ${errors.stock ? 'has-error' : ''}`}
                  disabled={isLoading}
                />
                {errors.stock && <span className="error-message">{errors.stock}</span>}
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">🏷️ Categoría</label>
              <select
                name="categoriaId"
                value={form.categoriaId}
                onChange={handleChange}
                className={`form-select ${errors.categoriaId ? 'has-error' : ''}`}
                disabled={isLoading}
              >
                <option value="">Seleccione una categoría</option>
                {categorias.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.nombre}</option>
                ))}
              </select>
              {errors.categoriaId && <span className="error-message">{errors.categoriaId}</span>}
            </div>

            <div className="form-group">
              <label className="form-label">🖼️ URL de la imagen (opcional)</label>
              <input
                type="url"
                name="imagen"
                value={form.imagen}
                onChange={handleChange}
                className="form-input"
                disabled={isLoading}
              />
            </div>

            <div className="modal-actions">
              <button type="submit" className="btn btn-primary" disabled={isLoading}>
                {isLoading ? "Creando..." : "Crear Peluche"}
              </button>
              <button type="button" className="btn btn-secondary" onClick={onClose} disabled={isLoading}>
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default CreatePeluchePage;

import React, { useState, useEffect } from "react";
import { createPeluche } from "../services/peluchesService.js";
import { getCategorias } from '../services/categoriasService.js';
import Swal from "sweetalert2";
import "../styles/CreatePeluchePage.scss";

function CreatePeluchePage({ onClose, onSuccess }) {
  const [form, setForm] = useState({
    nombre: "",
    descripcion: "",
    precio: "",
    stock: "",
    imagen: "",
    categoriaId: ""
  });

  const [categorias, setCategorias] = useState([]);

  useEffect(() => {
    fetchCategorias();
  }, []);

  const fetchCategorias = async () => {
    try {
      const data = await getCategorias();
      setCategorias(data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createPeluche({ 
        ...form, 
        precio: Number(form.precio), 
        stock: Number(form.stock) 
      });
      Swal.fire("Éxito", "Peluche creado correctamente", "success");
      setForm({ nombre: "", descripcion: "", precio: "", stock: "", imagen: "", categoriaId: "" });
      onSuccess(); // Notificar a la página principal para refrescar
      onClose(); // Cerrar modal
    } catch (err) {
      Swal.fire("Error", "No se pudo crear el peluche", "error");
    }
  };

  return (
    <div className="modal" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        <h2>Agregar Peluche</h2>
        <form onSubmit={handleSubmit} className="peluche-form">
          <input type="text" name="nombre" placeholder="Nombre" value={form.nombre} onChange={handleChange} required />
          <input type="text" name="descripcion" placeholder="Descripción" value={form.descripcion} onChange={handleChange} />
          <input type="number" name="precio" placeholder="Precio" value={form.precio} onChange={handleChange} required />
          <input type="number" name="stock" placeholder="Stock" value={form.stock} onChange={handleChange} required />
          <input type="text" name="imagen" placeholder="URL Imagen" value={form.imagen} onChange={handleChange} />

          <select name="categoriaId" value={form.categoriaId} onChange={handleChange} required>
            <option value="">Selecciona una categoría</option>
            {categorias.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.nombre}</option>
            ))}
          </select>

          <div className="modal-buttons">
            <button type="button" className="btn-secondary" onClick={onClose}>Cancelar</button>
            <button type="submit" className="btn-primary">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreatePeluchePage;

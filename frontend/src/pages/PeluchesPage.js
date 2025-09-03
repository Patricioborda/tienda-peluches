import React, { useEffect, useState } from 'react';
import { getPeluches, createPeluche, updatePeluche, deletePeluche } from '../services/peluchesService.js';
import Swal from 'sweetalert2';
import '../styles/PeluchesPage.scss';

const PeluchesPage = () => {
  const [peluches, setPeluches] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ id: null, nombre: '', precio: 0, imagen: '' });

  const fetchPeluches = async () => {
    try {
      const data = await getPeluches();
      setPeluches(data);
    } catch (error) {
      console.error('Error al traer peluches:', error);
    }
  };

  useEffect(() => {
    fetchPeluches();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formData.id) {
        // Update
        await updatePeluche(formData.id, formData);
        Swal.fire('Actualizado!', 'El peluche se actualizó correctamente', 'success');
      } else {
        // Create
        await createPeluche(formData);
        Swal.fire('Creado!', 'El peluche se creó correctamente', 'success');
      }
      setShowForm(false);
      setFormData({ id: null, nombre: '', precio: 0, imagen: '' });
      fetchPeluches();
    } catch (error) {
      Swal.fire('Error', 'Hubo un problema al guardar', 'error');
    }
  };

  const handleEdit = (peluche) => {
    setFormData(peluche);
    setShowForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este peluche?')) {
      try {
        await deletePeluche(id);
        fetchPeluches();
      } catch (error) {
        console.error('Error al eliminar peluche', error);
      }
    }
  };

  return (
    <div className="peluches-page">
      <h1>Peluches</h1>
      <button onClick={() => setShowForm(true)}>Agregar Peluche</button>

      <ul className="peluches-list">
        {peluches.map((p) => (
          <li key={p.id} className="peluche-item">
            <img src={p.imagen} alt={p.nombre} />
            <h2>{p.nombre}</h2>
            <p>${p.precio}</p>
            <button onClick={() => handleEdit(p)}>Editar</button>
            <button onClick={() => handleDelete(p.id)}>Eliminar</button>
          </li>
        ))}
      </ul>

      {showForm && (
        <div className="form-overlay">
          <form className="peluche-form" onSubmit={handleSubmit}>
            <h2>{formData.id ? 'Editar Peluche' : 'Nuevo Peluche'}</h2>
            <input type="text" name="nombre" placeholder="Nombre" value={formData.nombre} onChange={handleInputChange} required />
            <input type="number" name="precio" placeholder="Precio" value={formData.precio} onChange={handleInputChange} required />
            <input type="text" name="imagen" placeholder="URL Imagen" value={formData.imagen} onChange={handleInputChange} required />
            <div className="form-buttons">
              <button type="submit">{formData.id ? 'Actualizar' : 'Crear'}</button>
              <button type="button" onClick={() => { setShowForm(false); setFormData({ id: null, nombre: '', precio: 0, imagen: '' }); }}>Cancelar</button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
};

export default PeluchesPage;

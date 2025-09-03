// frontend/src/pages/PeluchesPage.js
import React, { useEffect, useState } from 'react';
import { getPeluches, deletePeluche } from '../services/peluchesService.js';
import Swal from 'sweetalert2';
import '../styles/PeluchesPage.scss';

const PeluchesPage = () => {
  const [peluches, setPeluches] = useState([]);

  useEffect(() => {
    fetchPeluches();
  }, []);

  const fetchPeluches = async () => {
    try {
      const data = await getPeluches();
      setPeluches(data);
    } catch (error) {
      console.error('Error al cargar peluches:', error);
    }
  };

  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: '¿Seguro?',
      text: 'No podrás revertir esta acción',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    });

    if (confirm.isConfirmed) {
      try {
        await deletePeluche(id);
        Swal.fire('Eliminado', 'El peluche fue eliminado con éxito', 'success');
        fetchPeluches(); // refresca la lista
      } catch (error) {
        Swal.fire('Error', 'No se pudo eliminar el peluche', 'error');
      }
    }
  };

  return (
    <div className="peluches-page">
      <h1>Lista de Peluches</h1>
      <ul className="peluches-list">
        {peluches.map((p) => (
          <li key={p.id} className="peluche-item">
            <img src={p.imagen} alt={p.nombre} />
            <h2>{p.nombre}</h2>
            <p>Precio: ${p.precio}</p>
            <p>{p.descripcion}</p>
            <button onClick={() => handleDelete(p.id)}>🗑 Eliminar</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeluchesPage;

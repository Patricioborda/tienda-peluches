import React, { useEffect, useState } from 'react';
import { getPeluches } from '../services/peluchesService.js';
import '../styles/PeluchesPage.scss'; // Para estilos específicos de esta página

const PeluchesPage = () => {
  const [peluches, setPeluches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Traer los peluches al montar el componente
  useEffect(() => {
    const fetchPeluches = async () => {
      try {
        const data = await getPeluches();
        setPeluches(data);
      } catch (err) {
        setError('No se pudieron cargar los peluches');
      } finally {
        setLoading(false);
      }
    };

    fetchPeluches();
  }, []);

  if (loading) return <p>Cargando peluches...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="peluches-page">
      <h1>Peluches Disponibles</h1>
      <ul className="peluches-list">
        {peluches.map((peluche) => (
          <li key={peluche.id} className="peluche-item">
            <img src={peluche.imagen} alt={peluche.nombre} />
            <h2>{peluche.nombre}</h2>
            <p>{peluche.descripcion}</p>
            <p>Precio: ${peluche.precio}</p>
            <p>Stock: {peluche.stock}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PeluchesPage;

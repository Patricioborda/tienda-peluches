import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/HomePage.scss';

const HomePage = () => {
  return (
    <div className="home-page">
      <h1>Bienvenido a la Tienda de Peluches</h1>
      <p>Explora nuestros peluches y encuentra tu favorito.</p>
      <Link to="/peluches" className="btn">
        Ver Peluches
      </Link>
    </div>
  );
};

export default HomePage;

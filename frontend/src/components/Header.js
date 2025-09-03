import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss'; // archivo de estilos para el header

const Header = () => {
  return (
    <header className="app-header">
      <div className="logo">
        <h1>Tienda de Peluches</h1>
      </div>
      <nav>
        <ul>
          <li><Link to="/">Inicio</Link></li>
          <li><Link to="/peluches">Peluches</Link></li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;

// frontend/src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss';

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
          <li><Link to="/categorias">Categorías</Link></li> {/* Nuevo link */}
        </ul>
      </nav>
    </header>
  );
};

export default Header;

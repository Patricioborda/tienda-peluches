import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Header.scss';

const Header = () => (
  <header className="app-header">
    <div className="logo"><h1>Capitan Capibara</h1></div>
    <nav>
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/productos">Productos</Link></li>
        <li><Link to="/categorias">Categorías</Link></li>
      </ul>
    </nav>
  </header>
);

export default Header;
